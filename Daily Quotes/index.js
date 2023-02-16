const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

let apiQuotes = [];

function showLoadingSpinner(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

document.getElementById("new-quote").addEventListener("click",newQuote= ()=>{
  showLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
  //Check if author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = "Unknown"
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine its styling
  if (quote.text.length>120) {
    quoteText.classList.add("long-quote")
  } else {
    quoteText.classList.remove("long-quote")
  }
  // Set quote,Hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
});

// Get Quotes from API
async function getQuotes(){
  showLoadingSpinner();
 const apiUrl = "https://type.fit/api/quotes";
 try{
   const response = await fetch(apiUrl);
   apiQuotes = await response.json();
   newQuote();
   removeLoadingSpinner();
 }catch(error){
   // catch error here

 }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

document.getElementById("twitter").addEventListener("click",tweetQuote);

// On loading
getQuotes();
