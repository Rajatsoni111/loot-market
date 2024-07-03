// New Script here for fetching from the fakestore api  
const rowDiv = document.querySelector('.row-of-data');
const container = document.querySelector('.data-container');
const btn = document.querySelector('.load-more');
const noResults = document.querySelector('.no-results')
const noHeading = document.querySelector('.no-heading');
let heading = document.querySelector('.heading');
let oldHeading;
const url = 'https://fakestoreapi.com/products/';

// Fetching the data form the api
async function getapi(url) {

    const response = await fetch(url);
    var data = await response.json();
    // console.log(data);
    return data;
}


//------------------------------------- Creating the data on the screen
function createData() {
    var data = getapi(url);

    // converting the response into the json data
    data.then((data) => {

        rowsCreator(data, rowDiv);
    });
}



function dropdownShower() {
    document.querySelector('.drop-btn1').style.display('block');
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
                h1.innerText = 'No results found!!';
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



// If the user presses the enter key for searching in the search box
// $(".search-input").keypress((event) => {
//     if(event.keyCode === 13){
//         $("search-btn").click();
//     }
// })

//-------------------------------------Creates the elements that matches the searched value
document.querySelector('.search-btn').addEventListener('click', (c) => {
    c.preventDefault();

    const searchTerm = document.querySelector('.search-input');
    // const heading = document.querySelector('.heading');
    // const selDrop = document.querySelector('.select-dropdown');
    // selDrop.innerHTML = "";
    oldHeading = document.createElement('h3');
    oldHeading = heading.innerHTML;
    container.innerHTML = "";
    heading.innerHTML = `<img src="../img/binoculars-fill.svg" alt="+"> Showing results for <span class="black">${searchTerm.value}</span>`;

    var row = document.createElement('div');
    row.classList = 'row row-col-sm-6 row-col-md-4 row-col-lg-2.4 row-col-xl-2.4 row-col-xxl-2 row-of-data';

    searchIt(searchTerm, row);

    // console.log("search");
    // console.log(result);
    // console.log(a);
});


// ----------------------------------------------------For the dropdown
function sorter() {
    const val = document.querySelector('#select').value;
    var row = document.createElement('div');
    row.classList = 'row row-col-sm-6 row-col-md-4 row-col-lg-2.4 row-col-xl-2.4 row-col-xxl-2 row-of-data';
    if (val === 'e') {
        container.innerHTML = "";
        const data = getapi(url + 'category/electronics');
        data.then((data) => {

            rowsCreator(data, row);
        });
    }
    else if (val === 'j') {
        container.innerHTML = "";
        const data = getapi(url + 'category/jewelery');
        data.then((data) => {

            rowsCreator(data, row);
        });

    }
    else if (val === 'm') {
        container.innerHTML = "";

        const data = getapi(url + "category/men's clothing");
        data.then((data) => {

            rowsCreator(data, row);
        });
    }
    else if (val === 'a') {
        container.innerHTML = ""; 
        console.log(oldHeading);
        if(oldHeading.innerText != ""){

            heading.innerHTML = oldHeading;
        }
        const data = getapi(url);
        data.then((data) => {

            rowsCreator(data, row);
        });
    }
    else if (val === 'w') {
        container.innerHTML = "";
        const data = getapi(url + "category/women's clothing");
        data.then((data) => {

            rowsCreator(data, row);
        });

    }

    else {
        // return;
    }

}


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

function collapser() {
    const nav = document.querySelector('#my-nav-collapse');

    if (nav.className === "nav-collapse") {
        nav.className += "active";
        console.log('systummm');
    }
    else {
        nav.className = "nav-collapse";
        console.log('else systummm');
    }

}

// Call the fetchImages function when the page is loaded
window.addEventListener('load', createData());










// const rowDiv = document.querySelector('.row-of-data');
// const fakeStoreUrl = 'https://fakestoreapi.com/products/';
// const amazonAPI = 'https://amazon24.p.rapidapi.com/api/category'
// fetch(fakeStoreUrl)
//     .then(
//         (res) => {
//             if (!res.ok) {
//                 console.log("error occured");
//             }
//             return res.json()
//         })
//     .then(
//         (data) => {
//             // console.log(data);
//             // console.log(window.innerWidth);
//             // console.log(window.innerHeight);
//             for (i = 0; i < data.length; i++) {

//                 const dataImage = data[i].image;
//                 // const dataCategory = data.category;
//                 const dataTitle = data[i].title;
//                 // const dataDescription = data[i].description;
//                 const dataPrice = data[i].price;

//                 // .col-	.col-sm-	.col-md-	.col-lg-	.col-xl-	.col-xxl-
//                 const div = `<div class="loading col col-6 col-sm-6 col-md-4 col-lg-2.4 col-xl-2 col-xxl-2 data-column">
//                                      <div class="card post-card">
//                                         <img src="" data-src="${dataImage}" alt="product-image" class="lazy card-img-top card-img" id="imageContainer">
//                                         <div class="card-body body-card">
//                                             <p class="card-text title"> ${dataTitle} </p><hr>
//                                             <p class="price"> ₹${dataPrice} </p>
//                                             <button class="buyNow">Buy Now</button>
//                                         </div>
//                                     </div>
//                                 </div>`;
//                 // card-body

//                 rowDiv.innerHTML += div;
//                 // imgDiv.innerHTML = imageEle;
//                 // console.log(image);
//             }
//             lazyLoad();
//             loadMore();
//         })
//     .catch((e) => console.log(e));



// // for the up arraw button
// let toTop = document.querySelector(' .to-top ');
// window.addEventListener("scroll", () => {
//     if (window.scrollY > 300) {
//         toTop.classList.add("active");
//     }
//     else {
//         toTop.classList.remove("active");
//     }
// });

// toTop.addEventListener('click', (c) => {
//     c.preventDefault();

//     document.body.scrollTop = 0;
//     document.documentElement.scrollTop = 0;
// })

// function lazyLoad() {
//     const lazyImages = document.querySelectorAll('.lazy');
//     const observer = new IntersectionObserver((entries, observer) => {
//         entries.forEach((entry) => {
//             if (entry.isIntersecting) {
//                 const img = entry.target;

//                 img.src = img.dataset.src;

//                 observer.unobserve(img);
//             }
//         });
//     });

//     lazyImages.forEach(img => observer.observe(img));

// }


// // for the functionality we are about to add in the pagination tab

// // const items = document.querySelectorAll('.l-items');
// // const prev = document.querySelector('#prev-btn');
// // const next = document.querySelector('#next-btn');


// // let currentValue = 1;

// // function removeActive() {

// //     for (l of items) {
// //         l.classList.remove('active');
// //     }

// //     event.target.classList.add('active');
// //     currentValue = event.target.value;
// // }

// // prev.addEventListener('click', (c) => {
// //     if (currentValue > 1) {
// //         for (l of items) {
// //             l.classList.remove('active');
// //         }
// //         currentValue--;
// //         items[currentValue - 1].classList.add('active');
// //     }
// // });


// // next.addEventListener('click', (c) => {
// //     if (currentValue < 5) {
// //         for (l of items) {
// //             l.classList.remove('active');
// //         }
// //         currentValue++;
// //         items[currentValue - 1].classList.add('active');
// //     }
// // });


// // For Load More button
// function loadMore() {
//     const loadingCol = document.querySelectorAll('.loading');
//     // const loadingCol = document.getElementsByClassName('.loading');

//     // console.log(loadingCol);
//     const btn = document.querySelector('.load-more');

//     let currentElement = 6;
//     btn.addEventListener('click', () => {



//         for (var i = currentElement; i < currentElement + 6; i++) {
//             if (loadingCol[i]) {
//                 loadingCol[i].style.display = 'block';
//                 console.log(loadingCol[i]);
//             }
//             //

//         }
//         currentElement += 6;
//         if (currentElement >= loadingCol.length) {
//             event.target.style.display = 'none';
//             // alert('hello guyzzz, welcome to my vlog');
//         }
//     });
// }