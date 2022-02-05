const button = document.getElementById('btn');
const audioElement = document.getElementById('audio');
// enable/disable btn
function toggleButton() {
    button.disabled = !button.disabled;
 }

  
function updateUI (data) {
    VoiceRSS.speech({
        key: 'key',
        src: data.setup + data.delivery || data.joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

button.addEventListener('click', async () => {
    try{
    JokeAPI.getJokes({
        jokeType: "single"
      })
        .then((r) => r.json())
        .then((data) => {
          updateUI(data);
        })
    toggleButton();
    }
        catch(err){
            console.log('błąd', err)
        }
})
//enables audio when it ends playing
audioElement.addEventListener('ended',toggleButton)