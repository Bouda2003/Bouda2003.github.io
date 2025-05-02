const arrow = document.querySelector('.arrow');
const compassCircle = document.querySelector('.compass-circle');

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

function handleOrientation(event) {
  const alpha = event.alpha;
  if (alpha != null) {
    // Rotate the whole compass with the device
    compassCircle.style.transform = `translate(-50%, -50%) rotate(${alpha}deg)`;
    // Rotate the arrow *opposite* to keep it fixed pointing North
    arrow.style.transform = `translateX(-50%) rotate(${-alpha}deg)`;
  }
}

document.body.addEventListener('click', requestOrientationPermission);
