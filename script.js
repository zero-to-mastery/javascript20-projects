const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;


// Unsplash API
let initialCount = 5;
const apiKey = 'W4UGHx_sOD8FypX1TmwuVYLCbK3zw_QBwkShSA3H7KY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Helper function to update the apiUrl after the initial loading
function updateAPIURLWithNewCount(picturesCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picturesCount}`;
}

// Helper function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Create Elements for the Links and the Photos and add them to the DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // loop the array to create the anchor tag
  photosArray.forEach(photo => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });
    // Create image for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });
    // Event listener, check when each photo is loaded
    img.addEventListener('load', imageLoaded);
    // Put <img> inside the <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    // Catch Error Here
    console.log("Oops, we have an error: ", error);
  }
}

// Check if we are scrolling near the bottom of the page, and then load new images
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();