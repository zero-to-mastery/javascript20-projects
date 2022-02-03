const quote = document.getElementById('quote');
const author = document.getElementById('author');
const twitter = document.getElementById('twitter');
const quoteContainer = document.getElementById('quote-container');
const loader = document.querySelector('.loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];
async function getQuotesFromApi() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const resp = await fetch(apiUrl);
        apiQuotes = await resp.json();
        getRandomQuote()
    } catch (err) {console.log(err)}
}
function getRandomQuote() {
    showLoadingSpinner();
    const randomNum = apiQuotes[Math.floor(Math.random() * Math.floor(apiQuotes.length))];
    if (!randomNum.author) author.textContent = "Russell WetBrick";
     else author.textContent = `${randomNum.author}`
    
    if (randomNum.text.length > 50) quote.classList.add('long-quote');
    else quote.classList.remove('long-quote');
    quote.textContent = `${randomNum.text}`
    removeLoadingSpinner();
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank')
}

getQuotesFromApi();
document.getElementById('new-quote').addEventListener('click', getRandomQuote)
twitter.addEventListener('click',tweetQuote)
