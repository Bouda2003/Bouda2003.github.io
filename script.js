const arrow = document.querySelector('.arrow');
const compassCircle = document.querySelector('.compass-circle');

const qiblaDirection = 135; // Replace with your actual Qibla direction

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
        // Rotate compass background to match phone orientation
        const compassRotation = -alpha;

        // Arrow should point toward Qibla (adjusted for phone heading)
        const arrowRotation = qiblaDirection - alpha;

        requestAnimationFrame(() => {
            compassCircle.style.transform = `translate(-50%, -50%) rotate(${compassRotation}deg)`;
            arrow.style.transform = `translateX(-50%) rotate(${arrowRotation}deg)`;
        });
    }
}

document.body.addEventListener('click', requestOrientationPermission);
