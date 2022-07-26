const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get Quotes With Local Method

// Show New Quote
// function newQuote() {
//   // Pick a random quote from apiQuotes array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)]
//   console.log(quote)
// }

// newQuote()

let apiQuotes = []

// Show Loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hide Loading
function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}

// Get Quotes From API
async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    // Catch error here
    console.log('error')
  }
}

// Show New Quote
function newQuote() {
  loading()
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  //   Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown'
  } else {
    authorText.textContent = quote.author
  }
  //   Check Quote lenght to determine styling
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  //   Set the quote, hide the loader
  quoteText.textContent = quote.text
  complete()
}

// Tweet Quote
function tweetQuote() {
  twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuotes()
