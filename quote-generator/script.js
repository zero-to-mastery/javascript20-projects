const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoading() {
   if(loader.hidden = false);
    quoteContainer.hidden = true;
}

function hideLoading() {
    if(!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
    }
}

async function getQuoteApi() {
    showLoading();
    const proxyUrl = 'https://sheltered-peak-46520.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    // If author is blank, add unknown
    try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if(data.quoteAuthor === '') {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = data.quoteAuthor;
    }
    // reduce font size for long quotes
    if(data.quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    hideLoading();
} catch(error) {
        getQuoteApi();
        
    }
}

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuoteApi);
twitterBtn.addEventListener('click', tweetQuote);

getQuoteApi();