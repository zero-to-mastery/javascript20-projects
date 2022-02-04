const imgContainer = document.getElementById('images-container');
const title = document.getElementById('images-title')
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.style.display = 'block';
    imgContainer.classList.add('loading');
    title.classList.add('loading');
}
function removeLoadingSpinner() {
    loader.style.display = 'none';
    imgContainer.classList.remove('loading');
    title.classList.remove('loading');

}

//helper function wchich sets attributes
function setsAttributes(i, attr){
    for(const key in attr){
        i.setAttribute(key, attr[key])
    }
}

// appending new anchors with images to imgContainer
function displayPhotos() {
    showLoadingSpinner();
    apiPics.forEach((pic) => {
        const a = document.createElement('a');
        setsAttributes(a, {
            href : pic.links.html,
            target : '_blank'
        })

        const img = document.createElement('img');
        setsAttributes(img, {
            src : pic.urls.regular,
            alt : pic.location.title || pic.alt_description || pic.description || "Unsplash image",
            title : pic.location.title || pic.alt_description || pic.description || "Unsplash image"
        })

        img.classList.add('img');

        a.appendChild(img)
        imgContainer.appendChild(a)
    })
}

let apiPics = [];

async function getPhotos() {
    showLoadingSpinner();
    const count = 30;
    const myKey = 'My_Access_Key_Here'
    const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${myKey}&count=${count}`
    try {
        const resp = await fetch(apiUrl);
        apiPics = await resp.json();
        displayPhotos()
    } catch (err) {console.log(err)}
    removeLoadingSpinner();
}

const isInViewport = function (ele) {
    const rect = ele.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

function getMorePics() {
    const a = imgContainer.lastChild;
    if (isInViewport(a)) {
        getPhotos();
    }
}

//on load
getPhotos();
window.addEventListener('scroll', getMorePics)