const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const quoteAuthor= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader = document.getElementById('loader');
// Store Quotes
let apiQuotes= [];

// show loader
function loading() {
   loader.hidden = false;
   quoteContainer.hidden = true;
}

// hide loader
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Get New Quote
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author unknown
    if(!quote.author){
      quoteAuthor .textContent = "Unknown";
    }else{
      quoteAuthor .textContent = quote.author;
    }
    // check quote length
    if(quote.length > 100){
      quoteText.classList.add("long-quote");
    }else{
      quoteText.classList.remove("long-quote"); 
    }
      quoteText.textContent = quote.text;
      complete();
    }

async function getQuotes() {
    loading();
    const apiUrl= 'https://type.fit/api/quotes';
    try{
       const res= await fetch(apiUrl);
       apiQuotes= await res.json();
       newQuote();
    }catch (error){
        alert('Something went wrong!');
    }
    
}

// tweet quotes
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}

// EventListeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

