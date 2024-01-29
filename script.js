const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader =document.getElementById('loader');

let apiQuotes = [];

/* Show Loading */
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

/* Hide Loading */
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show New Quote
function newQuote(){
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with Unknown
    //if (!quote.author) {
        //authorText.textContent = "Unknown";
    //} else {
    authorText.textContent = quote.author;
    //}
    // Check Quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete ();
}

// Get quotes from API (1)
async function getQuotes(callback) {
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status} - ${response.statusText}`);
        }

        apiQuotes = await response.json();

        // Verifica la struttura dei dati
        console.log(apiQuotes);

        // Assicurati che 'author' sia definito prima di accedervi
        if (apiQuotes && apiQuotes.length > 0) {
            apiQuotes.forEach(quote => {
                if (quote && quote.author) {
                    console.log('Author:', quote.author);
                    // Puoi fare qualcos'altro con quote.author qui
                } else {
                    console.error('La proprietà "author" non è definita per questo oggetto quote.');
                }
            });
        } else {
            console.error('Dati non validi o vuoti.');
        }
        // Chiamata a newQuote dopo aver ottenuto le citazioni
        if (typeof callback === 'function') {
            callback();
        }
    } catch(error) {
        console.error('Errore nella richiesta:', error.message);
        alert('Si è verificato un errore durante il recupero delle citazioni.');
        // Gestisci l'errore in modo appropriato
    }
}


// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On load
window.addEventListener('load', function (){
    getQuotes(newQuote);
});
