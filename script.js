const arrow = document.querySelector('.arrow');
const compassCircle = document.querySelector('.compass-circle');

// Set the Qibla direction (e.g., 135° for Southeast direction)
const qiblaDirection = 135;

function requestOrientationPermission() {
    if (typeof DeviceOrientationEvent?.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('deviceorientation', handleOrientation, true);
                } else {
                    alert('Permission denied');
                }
            })
            .catch(console.error);
    } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
    }
}

function handleOrientation(event) {
    const alpha = event.alpha;
    if (alpha != null) {
        // Rotate the compass background to match the device's orientation
        const compassRotation = -alpha;

        // Calculate the arrow's rotation based on the Qibla direction and device's heading
        const arrowRotation = qiblaDirection - alpha;

        // Apply the rotation using `requestAnimationFrame` for smooth transitions
        requestAnimationFrame(() => {
            compassCircle.style.transform = `rotate(${compassRotation}deg)`;  // Compass rotates to device orientation
            arrow.style.transform = `rotate(${arrowRotation}deg) translate(-50%, 50%)`;  // Arrow rotates to Qibla
        });
    }
}

// Wait for a user click to ask for permission (iOS 13+)
document.body.addEventListener('click', requestOrientationPermission);
