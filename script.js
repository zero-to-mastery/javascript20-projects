const quoteCont=document.getElementById('container');
const quotetext=document.getElementById('quote');
const quoteauthor=document.getElementById('author');
const twitterbtn=document.getElementById('twitter');
const newq=document.getElementById('newq');

let a=localquote;
async function getquote(){
 let quote1=a[Math.floor(Math.random()*a.length)];
 quotetext.innerText=quote1.text;
 if (quote1.author!=null)
 quoteauthor.innerText=quote1.author;
if(quote1.text.length>=100){
    quotetext.style.fontSize='1.9rem';
}
}
function teweet(){
    const tweeturl=`https://twitter.com/intent/tweet?text=${quotetext.innerText}-${quoteauthor.innerText}`;
    window.open(tweeturl,'_blank')
}
twitterbtn.addEventListener('click',teweet);
newq.addEventListener('click',getquote);
