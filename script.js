const arrow = document.querySelector('.arrow');
const compassCircle = document.querySelector('.compass-circle');

// Replace with your actual Qibla direction (example: 135° = southeast)
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
        const compassRotation = -alpha;
        const arrowRotation = qiblaDirection - alpha;

        requestAnimationFrame(() => {
            compassCircle.style.transform = `rotate(${compassRotation}deg)`;
            arrow.style.transform = `rotate(${arrowRotation}deg) translate(-50%, 50%)`;
        });
    }
}

document.body.addEventListener('click', requestOrientationPermission);
