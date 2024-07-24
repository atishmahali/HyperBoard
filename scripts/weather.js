const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");

// Get previously fetched weather data from localStorage
const weatherPreviouslyFetched = localStorage.getItem("hyperboard_WEATHER");

function updateWeather() {
    if (weatherPreviouslyFetched) {
        const { temperature: oldTemp, at } = JSON.parse(weatherPreviouslyFetched);

        // Check if the cached data is older than 1 hour
        if (Date.now() > at + 1000 * 60 * 60) {
            fetchWeatherData();
        } else {
            displayWeather(oldTemp);
        }
    } else {
        localStorage.removeItem("hyperboard_WEATHER");
        fetchWeatherData();
    }
}

async function fetchWeatherData() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const WEATHER_API = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            try {
                const response = await fetch(WEATHER_API);

                if (response.ok) {
                    const data = await response.json();
                    const icon = data.current_weather.rain
                        ? "rainy"
                        : data.current_weather.is_day
                            ? "sunny"
                            : "night";

                    const weatherData = {
                        temp: data.current_weather.temperature,
                        icon,
                        unit: "°C" // Assuming the API returns temperature in Celsius
                    };

                    displayWeather(weatherData);

                    localStorage.setItem(
                        "hyperboard_WEATHER",
                        JSON.stringify({
                            at: Date.now(),
                            temperature: weatherData,
                        })
                    );
                } else {
                    throw new Error("Couldn't get the temperature");
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
                resetWeatherToPreviousOrEmpty();
            }
        }, resetWeatherToPreviousOrEmpty);
    } else {
        console.error("Geolocation is not supported by this browser.");
        resetWeatherToPreviousOrEmpty();
    }
}

function displayWeather(weatherData) {
    temperature.textContent = `${weatherData.temp} ${weatherData.unit}`;
    weatherIcon.src = `./imgs/icons/${weatherData.icon}.svg`;
    weatherIcon.dataset.good = "true";
}

function resetWeatherToPreviousOrEmpty() {
    if (weatherPreviouslyFetched) {
        const { temperature: oldTemp } = JSON.parse(weatherPreviouslyFetched);
        displayWeather(oldTemp);
    } else {
        temperature.textContent = "Weather data not available.";
        weatherIcon.src = ""; // Clear the icon source
    }
}

updateWeather();
