const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Function to enable/disable the button
const toggleButton = () => button.disabled = !button.disabled;

// Passing Joke to VoiceRSS Api
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: '8f1cec450b9e449dac4315502c2bedd2',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get jokes from JOKE API
const getJokes = async () => {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;
    // Text-to-speech API
    tellMe(joke);
    // Disable the button
    toggleButton();
  } catch (error) {
    // Catch Errors
    console.log('whoops', error);
  }
}

// Event Listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);