const arrow = document.querySelector('.arrow');

// Ask for permission (iOS 13+)
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
        // Android or older iOS versions
        window.addEventListener('deviceorientation', handleOrientation, true);
    }
}

// Handle compass movement
function handleOrientation(event) {
    const alpha = event.alpha;
    if (alpha != null) {
        console.log("alpha:", alpha);
        const rotation = 360 - alpha;
        arrow.style.transform = `rotate(${rotation}deg)`;
    }
}

// Wait for user to click anywhere to ask for permission
document.body.addEventListener('click', requestOrientationPermission);
