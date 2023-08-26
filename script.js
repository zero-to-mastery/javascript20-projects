const quoteContainer = document.getElementById("quote-container");
const quoteContainerReal = document.getElementById("quote-containerreal");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// Get Quotes from API
let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainerReal.hidden = true;
}

function complete() {
  quoteContainerReal.hidden = false;
  loader.hidden = true;
}

//show new quotes

function newQuotes() {
  loading();
  setTimeout (() => {
      //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // console.log(quote);
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  complete();
  }, 500)
}

async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const res = await fetch(apiUrl);
    apiQuotes = await res.json();
    newQuotes();
  } catch (error) {
    message = "Error gettingQuotes";
    alert(error.message);
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();

// Local Quotes
// function newLocalQuotes() {
//     //Pick a random quote from array
//     const newquote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(newquote);
// }

// newLocalQuotes();
