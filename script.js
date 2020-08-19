// get elements from Dom
// video
const videoElement = document.getElementById('video');
// button
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (err) {
    console.log('whoops, error here:', err);
  }
}

// add click listener to button
button.addEventListener('click', async () => {
  // Disable the button
  button.disabled = true;
  // Start Picture in Picture mode
  await videoElement.requestPictureInPicture();
  // Enabled the button
  button.disabled = false;
});

// call the function on load
selectMediaStream();