const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

    function showLoadSpinner(){
        loader.hidden = false;
        quoteContainer.hidden = true;
    }

   function removeLoadSpinner(){
       if(!loader.hidden){
           quoteContainer.hidden = false;
           loader.hidden = true;
       } 
   }

async function getQuoteFromAPI() {

    showLoadSpinner();

    const proxyUrl = 'https://secret-ocean-38471.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if author is blank, add unknown
        if(data.quoteAuthor === ''){
            authorText.innerText = "Unknown"
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        
        // Reduce font size if the quote is long
        if(data.quoteText.length >120){
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
 
    removeLoadSpinner();

    }catch(error) {
        getQuoteFromAPI();
        console.log("Whoops, no quote", error);
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}                        
//Event Listeners
    newQuoteBtn.addEventListener('click', getQuoteFromAPI);
    twitterBtn.addEventListener('click', tweetQuote)

getQuoteFromAPI()