const qouteContainer = document.getElementById('qoute-container')
const qouteText = document.getElementById('qoute')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQouteBtn = document.getElementById('new-qoute')
const loader = document.getElementById('loader')

// Show Loading
function loading() {
  loader.hidden = false
  qouteContainer.hidden = true
}
// Hide Loading
function complete() {
  qouteContainer.hidden = false
  loader.hidden = true
}

let apiQoutes = []

// Show New Qoute
function newQoute() {
  loading()
  // Pick a random qoute from apiQoutes array
  const qoute = apiQoutes[Math.floor(Math.random() * apiQoutes.length)]
  // Check if Author field is blank and replace it with 'Unknown'
  if (!qoute.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = qoute.author
  }
  //   Check Qoute length to determine styling
  if (qoute.text.length > 50) {
    qouteText.classList.add('long-qoute')
  } else {
    qouteText.classList.remove('long-qoute')
  }
  qouteText.textContent = qoute.text
  // Stop Loader, Show Qoute
  complete()
}
// Get Qoutes from  API
async function getQoutes() {
  loading()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const response = await fetch(apiUrl)
    apiQoutes = await response.json()
    newQoute()
  } catch (error) {
    // catch error here
  }
}

// Tweet Qoute
function tweetQoute() {
  const twiiterUrl = `https://twitter.com/intent/tweet?text=${qouteText.textContent} - ${authorText.textContent}`
  window.open(twiiterUrl, '_blank')
}

// Event Listeners
// New Qoute on Click
newQouteBtn.addEventListener('click', newQoute)
twitterBtn.addEventListener('click', tweetQoute)

getQoutes()
