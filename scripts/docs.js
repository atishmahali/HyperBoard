document.addEventListener('DOMContentLoaded', (event) => {
    const iframe = document.getElementById('draggable-iframe');
    let isDragging = false;
    let reloadInterval;

    // Function to reload the iframe
    function reloadIframe() {
        iframe.src = iframe.src;
    }

    // Set interval to reload the iframe every 30 seconds
    reloadInterval = setInterval(reloadIframe, 30000); // Reload every 30 seconds

    iframe.onmousedown = function(event) {
        event.preventDefault();
        isDragging = true;

        let shiftX = event.clientX - iframe.getBoundingClientRect().left;
        let shiftY = event.clientY - iframe.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            let newLeft = pageX - shiftX;
            let newTop = pageY - shiftY;

            // Ensure the iframe stays within the viewport
            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft + iframe.offsetWidth > document.documentElement.clientWidth) {
                newLeft = document.documentElement.clientWidth - iframe.offsetWidth;
            }
            if (newTop + iframe.offsetHeight > document.documentElement.clientHeight) {
                newTop = document.documentElement.clientHeight - iframe.offsetHeight;
            }

            iframe.style.left = newLeft + 'px';
            iframe.style.top = newTop + 'px';
        }

        function onMouseMove(event) {
            if (isDragging) {
                moveAt(event.pageX, event.pageY);
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        iframe.onmouseup = function() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            iframe.onmouseup = null;
        };

        document.onmouseup = function() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
        };
    };

    iframe.ondragstart = function() {
        return false;
    };

    // Clean up the interval on unload
    window.addEventListener('beforeunload', () => {
        clearInterval(reloadInterval);
    });
});
