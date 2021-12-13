const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let quote = "";

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    quoteText.textContent = quote;
    complete();
}

// Get Quotes From API
async function getQuote() {
    loading();
    const apiUrl = 'https://api.chucknorris.io/jokes/random';
    try {
        const response = await fetch(apiUrl);
        apiQuote = await response.json();
        quote = apiQuote.value;
        newQuote();
    } catch (error) {
        alert(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote();