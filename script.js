// Define Variables for the Id elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let attempt = 0;
const maxNumberAttempts = 10;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

async function getQuoteFromAPI() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://favqs.com/api/qotd';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    const {
      quote: {
        body,
        author
      }
    } = data;
    // If author is blank add unknown
    authorText.innerText = author === '' ? 'Unknown' : author;
    // Reduce font-size for long quote
    if (body.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = body;
    removeLoadingSpinner();
  } catch (error) {
    attempt++;
    if (attempt < maxNumberAttempts) {
      getQuoteFromAPI();
    }
    getQuoteFromAPI();
    console.log('whoops, there\'s something bad, you have reached the maximum number of attempts because of this error: ', error);
  }
}

// Send quote to Twitter
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  // open in a new tab
  window.open(twitterUrl, '_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuoteFromAPI();