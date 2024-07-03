// New Script here for fetching from the fakestore api  
const rowDiv = document.querySelector('.row-of-data');
const container = document.querySelector('.data-container');
const btn = document.querySelector('.load-more');
const url = 'https://fakestoreapi.com/products/';

// Fetching the data form the api
async function getapi(url) {

    const response = await fetch(url);
    var data = await response.json();

    return data;
}

// function fetchData(url) {
//     fetch(url)
//         .then(
//             (res) => {
//                 if (!res.ok) {
//                     console.log("error occured");
//                 }
//                 return res.json()
//             })
//         .then(
//             (data) => {

//                 return data;

//             })
//         .catch((e) => { return e; });
//     return data;
// }


//------------------------------------- Creating the data on the screen
function createData() {
    var data = getapi(url);

    // converting the response into the json data
    data.then((data) => {

        rowsCreator(data, rowDiv);
    });
}


// ------------------------------------Creates the rows and puts the provided data in them 
function rowsCreator(data, row) {
    // console.log('rowsCreator');
    // console.log(data);
    // console.log(result);
    // console.log(data);
    // console.log(data.length);
    for (i = 0; i < data.length; i++) {

        const dataImage = data[i].image;
        // const dataCategory = data.category;
        const dataTitle = data[i].title;
        // const dataDescription = data[i].description;
        const dataPrice = data[i].price;

        // Creating the div element (Column) for holding the card
        const div = `<div class="loading col col-6 col-sm-6 col-md-4 col-lg-2.4 col-xl-2 col-xxl-2 data-column">
                         <div class="card post-card">
                            <img src="" data-src="${dataImage}" alt="product-image" class="lazy card-img-top card-img" id="imageContainer">
                            <div class="card-body body-card">
                                <p class="card-text title"> ${dataTitle} </p><hr>
                                <p class="price"> ₹${dataPrice} </p>
                                <button class="buyNow">Buy Now</button>
                            </div>
                        </div>
                    </div>`;

        // console.log(div);
        row.innerHTML += div;
    }
    // console.log(row);
    container.innerHTML = row.outerHTML;
    lazyLoad();
    loadMore();

}


//----------------------------------------- For filtering the data matching to the searched query
function searchIt(searchTerm, row) {

    if (searchTerm.value.length > 0) {

        const data = getapi(url);
        // console.log(data);

        // converting the response into the json data
        data.then((data) => {

            // Filtering out the matching data from the dataset
            var a = data.filter(obj => obj.title.toLowerCase().includes(searchTerm.value.toLowerCase()) || obj.description.toLowerCase().includes(searchTerm.value.toLowerCase()) || obj.category.toLowerCase().includes(searchTerm.value.toLowerCase()));
            if (Object.keys(a).length > 0) {

                rowsCreator(a, row);
            }

            else {
                const div = document.createElement('div');
                div.classList = 'no-results';
                const h1 = document.createElement('h1');
                h1.classList = 'no-heading';
                h1.innerHTML = '<i class="fa-solid fa-xmark" style="color: grey;"></i> No results found!!';
                div.innerHTML = h1.outerHTML;

                div.classList.add("show");
                container.innerHTML = div.outerHTML;

            }

            // To define the visibility of the load-more button
            if (a.length <= 6) {
                btn.style.display = 'none';
            }
        });
    }
    else return 0;
}

//-------------------------------------Creates the elements that matches the searched value
document.querySelector('.search-btn').addEventListener('click', (c) => {
    c.preventDefault();

    const searchTerm = document.querySelector('.search-input');
    const heading = document.querySelector('.heading');
    container.innerHTML = "";
    heading.innerHTML = `<i class="fa-solid fa-binoculars fa-md" style="color: #000000;"></i> Showing results for <span class="black">${searchTerm.value}</span>`;

    var row = document.createElement('div');
    row.classList = 'row row-col-sm-6 row-col-md-4 row-col-lg-2.4 row-col-xl-2.4 row-col-xxl-2 row-of-data';
    // const a = 
    searchIt(searchTerm, row);

    // console.log("search");
    // console.log(result);
    // console.log(a);
});



//------------------------------------------------ For the up arraw button
let toTop = document.querySelector(' .to-top ');
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        toTop.classList.add("active");
    }
    else {
        toTop.classList.remove("active");
    }
});

toTop.addEventListener('click', (c) => {
    c.preventDefault();
    topBtn();

});

function topBtn() {
    // For Safari
    document.body.scrollTop = 0;
    // For Chrome, Firefox, IE, and Opera
    document.documentElement.scrollTop = 0;
}

//-------------------------------------------- Function to lazy load the images
function lazyLoad() {
    // console.log('lazy load');
    const lazyImages = document.querySelectorAll('.lazy');

    // Create the Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the image is in the viewport
            if (entry.isIntersecting) {
                const img = entry.target;

                // Load the actual image from the data-src attribute
                img.src = img.dataset.src;

                // Unobserve the image so that it won't be checked again
                observer.unobserve(img);
            }
        });
    });

    // Observe each lazy image
    lazyImages.forEach(image => {
        observer.observe(image);
    });
}



//---------------------------------------------------- For Load More button
function loadMore() {
    // console.log('load More');
    const loadingCol = document.querySelectorAll('.loading');
    // const btn = document.querySelector('.load-more');

    let currentElement = 6;
    btn.addEventListener('click', () => {

        for (var i = currentElement; i < currentElement + 6; i++) {
            if (loadingCol[i]) {
                loadingCol[i].style.display = 'block';
            }

        }
        currentElement += 6;
        if (currentElement >= loadingCol.length) {
            event.target.style.display = 'none';
            // alert('hello guyzzz, welcome to my vlog');
        }
    });
}



// Call the fetchImages function when the page is loaded
window.addEventListener('load', createData());