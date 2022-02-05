let video = document.getElementById('video');
const pipBtn = document.getElementById('start')

// Prompt to select media stream, pass it to video elem and then play it after loaded data
async function startCapture(displayMediaOptions) {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
          video.play()
      }
    } catch(err) {
      console.error("Error: " + err);
    }
  }

pipBtn.addEventListener('click', async () => {
    //disable button
    pipBtn.disabled = true;
    // Start Picture in picture
    await video.requestPictureInPicture();
    // reset button
    pipBtn.disabled = false;
})
startCapture();