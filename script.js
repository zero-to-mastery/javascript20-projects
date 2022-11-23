let quoteContainer = document.getElementById("quote-container")
let quoteText = document.getElementById("quote")
let quoteAuthor = document.getElementById("author")
let twitterBTN = document.getElementById("twitter")
let newQuoteBTN = document.getElementById("new-quote")
let loader = document.getElementById("loader")

let apiQuotes = []
// Show loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}
// Hide loading
function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}
// Show new quote
function newQuote() {
  loading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  // Check if author field is blank
  if (!quote.author) {
    quoteAuthor.textContent = "Unkown"
  } else {
    quoteAuthor.textContent = quote.author
  }
  // if quote length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote")
    // console.log(quote.text.length)
  } else {
    quoteText.classList.remove("long-quote")
  }
  quoteText.textContent = quote.text
  complete()
  //   console.log(quote)
}

// Get quotes from api

async function getQuotes() {
  loading()
  const apiUrl = "https://type.fit/api/quotes"
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    // catch error here
    console.log(error)
  }
}
// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
  window.open(twitterUrl, "_blank")
}

// EventListeners
newQuoteBTN.addEventListener("click", newQuote)
twitterBTN.addEventListener("click", tweetQuote)
// On load
// loading()
getQuotes()
