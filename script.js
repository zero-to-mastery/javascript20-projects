const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const tweetBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const favoriteBtn = document.getElementById('favorite');

let quotesFromApi = [];
let favQuotesArray = [];

async function getQuotesFromApi() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        quotesFromApi = await response.json();
        placeGenerateQuoteOnPage();
    }
    catch(error) {
        // catch error here!
    }
}

getQuotesFromApi();

function placeGenerateQuoteOnPage() {
    const generatedQuote = quotesFromApi[Math.floor(Math.random() * (quotesFromApi.length - 1))];

    if (generatedQuote.author === null) {
        authorText.textContent = 'Unknown';
    }
    else {
        authorText.textContent = generatedQuote.author;
    }
    
    // check quote length and apply css class 'long-quote' for long quotes
    if (generatedQuote.text.length > 100) {
        quoteText.classList.add('long-quote');
        quoteText.classList.remove('quote-text');
    }
    else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = generatedQuote.text;
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function showFavoriteQuotes() {
    // add the quote and author pair to the quotes array
    let quotePlusAuthor = {};
    quotePlusAuthor.text = quoteText.textContent;
    quotePlusAuthor.author = authorText.textContent;
    
    // check if quote already in the array
    if (favQuotesArray.find(item => item.text === quotePlusAuthor.text) == undefined) {
        favQuotesArray.push(quotePlusAuthor);
    
    
        // create the new div container element
        const newDivContainer = document.createElement('div');
        // newDivContainer.innerText = "This is the new div";
        newDivContainer.classList.add('quote-container-fav');
        document.body.appendChild(newDivContainer);
        console.log(newDivContainer);

        // create the new div for the quote
        const newDivForQuote = document.createElement('div');
        newDivForQuote.classList.add('quote-text-fav');
        newDivContainer.appendChild(newDivForQuote);

        // create the span inside the quote div
        const newSpanForQuote = document.createElement('span');
        newSpanForQuote.id = 'quote-fav';
        newSpanForQuote.innerText = quotePlusAuthor.text;
        newDivForQuote.appendChild(newSpanForQuote);

        // create the new div for the author
        const newDivForAuthor = document.createElement('div');
        newDivForAuthor.classList.add('quote-author-fav');
        newDivContainer.appendChild(newDivForAuthor);
    
        // create the span inside the author div
        const newSpanForAuthor = document.createElement('span');
        newSpanForAuthor.id = 'author-fav';
        newSpanForAuthor.innerText = quotePlusAuthor.author;
        newDivForAuthor.appendChild(newSpanForAuthor);

    }    

}

tweetBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', placeGenerateQuoteOnPage);
favoriteBtn.addEventListener('click', showFavoriteQuotes);


