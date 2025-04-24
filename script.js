const arrow = document.querySelector('.arrow');

// Function to handle device orientation
function handleOrientation(event) {
    const alpha = event.alpha; // Compass heading in degrees (0° = North)

    if (alpha !== null) {
        // Rotate the arrow to point north (or toward Qibla if you add a direction offset)
        const rotation = 360 - alpha;
        arrow.style.transform = `rotate(${rotation}deg)`;
    }
}

// Check if device orientation is supported
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation, true);
} else {
    alert("Your device doesn't support orientation events.");
}
