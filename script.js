const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader")

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading 
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  // Pick a random quote from apiQuotes array
  let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);

  // If there is no author add Unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  
  //Check quote length
  if(quote.text.length > 120){
    quoteText.classList.add('long-quote')
  }else {
    quoteText.classList.remove('long-quote')
  }

  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  complete();

}

//Get new quotes
async function getQuotes() {
  loading();
  try {
    const apiUrl = "https://type.fit/api/quotes";
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    console.log(err);
  }
}

//Tweet Quotes
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')

}

// Event Listeners 
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click', tweetQuote )

// on load
getQuotes();

