const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



let apiQuotes = [];

//show that it is loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Show the  newQuote

function newQuote() {
    loading();
    //pick random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //check if author field is null replace with "Unknown"
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    //check quote length to replace styling of text
    if (quote.text.length > 75) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote ");
    }
    //Set Quote , Hide Loader
    quoteText.textContent = quote.text;
    complete();

}

//Get quotes from API

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch errors here
    }
}

//tweet quote

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuotes();
