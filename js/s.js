// Chalu 

// function slider(){
//   const image = document.querySelector('#img1');
// }


// const lazyImages = document.getElementsByClassName("lazyloader");
// // const lazyImages = document.querySelectorAll('[data-src]');
// console.log(lazyImages.getAttribute('data-src'));
// console.log("started executing");
// // for lazyloading the image in the window
// function preloadImage(img) {
//     // const src = img.getAttribute("data-src");
//     const src = img.dataset.src;

//     if (!src) { 
//         console.log("preload if");
//         return; 
//     }
//     console.log("preload out-of-the-if");
//     img.src = src;
// }

// // const lazyImages = document.getElementById("#lazyloader");
// // const lazyImages = document.querySelectorAll("#lazyloader");

// // console.log(lazyImages);
// const imageObserver = {
//     threshold: 1
// };

// const imgObserver = new IntersectionObserver((entries, observer) => {
//     console.log("image observer");
//     entries.forEach((entry) => {
//         if (!entry.isIntersecting){ 
//             console.log("if");    
//             return; 
//         }
//         else {
//             console.log("else");
//             preloadImage(entry.target);
//             observer.unobserve(entry.target);
//         }
//     })
// }, imageObserver);
// console.log("before for-each");
// console.log(lazyImages);
// console.log(typeof lazyImages);
// // for (let i = 0; i < Object.keys(lazyImages).length; i++) {
// //     const element = lazyImages[i];
// //     console.log(element);
// // }

// console.log(Object.keys(lazyImages).length);
// // Object.values(lazyImages.i);
// // const a = Object.values((data) => Object.values(lazyImages));
// // const a = lazyImages.filter(obj => obj.src);
// // console.log(a);
// // const li = lazyImages.filter(data => lazyImages);

// // console.log(Object.values(lazyImages));
// // for(i = 0; i <lazyImages.length; i++){
//     // imgObserver.observe(lazyImages[i]);
//     // console.log(lazyImages[i])

// // }
// // lazyImages.forEach(img => {
// //     console.log("forEach for observing the images");
// // });

// // ------- End of the lazyload part ---------------





// Function to lazy load the images
// function lazyLoad() {
//   const lazyImages = document.querySelectorAll('.lazyloader');
//   console.log(lazyImages);

//   // Create the Intersection Observer
//   const observer = new IntersectionObserver((entries, observer) => {
//     entries.forEach(entry => {
//       // If the image is in the viewport
//       if (entry.isIntersecting) {
//         const img = entry.target;

//         // Load the actual image from the data-src attribute
//         img.src = img.dataset.src;

//         // Unobserve the image so that it won't be checked again
//         observer.unobserve(img);
//       }
//     });
//   });

//   // Observe each lazy image
//   lazyImages.forEach(image => {
//     observer.observe(image);
//   });
// }

// // Call the lazyLoad function when the page is loaded
// window.addEventListener('load', lazyLoad);


// for the functionality we are about to add in the pagination tab

// const items = document.querySelectorAll('.l-items');
// const prev = document.querySelector('#prev-btn');
// const next = document.querySelector('#next-btn');
// let currentValue = 1;

// prev.disabled = true;

// function removeActive() {

//   for (l of items) {
//     l.classList.remove('active');
//   }

//   event.target.classList.add('active');
//   currentValue = event.target.value;
//   if(currentValue == 1){
//     prev.disabled = true;
//   }
//   else if(currentValue == 5){
//     next.disabled = true;
//   }
// }

// prev.addEventListener('click', (c) => {
//   if (currentValue > 1){
//     for(l of items){
//       l.classList.remove('active');
//     }
//     currentValue--;
//     items[currentValue-1].classList.add('active');
//   }
// });


// next.addEventListener('click', (c) => {
//   if (currentValue < 5){
//     for(l of items){
//       l.classList.remove('active');
//     }
//     currentValue++;
//     items[currentValue-1].classList.add('active');
//   }
// });




// const contentContainer = document.getElementById("content-container");
// const loadMoreButton = document.getElementById("load-more");

// let currentOffset = 0;
// const itemsPerPage = 10;

// loadMoreButton.addEventListener("click", () => {
//   fetchData(currentOffset, itemsPerPage);
//   currentOffset += itemsPerPage;
//   console.log("event");
// });

// async function fetchData(offset, limit) {
//   try {
//     console.log('fetched');
//     const url = 'https://fakestoreapi.com/products/';
//     const response = await fetch(`${url}?offset=${offset}&limit=${limit}`);
//     const data = await response.json();

//     for (i = 0; i < data.length; i++) {

//       const dataImage = data[i].image;
//       const dataCategory = data.category;
//       const dataTitle = data[i].title;
//       const dataDescription = data[i].description;
//       const dataPrice = data[i].price;

//       const div = `<div class="loading col col-6 col-sm-6 col-md-4 col-lg-2.4 col-xl-2 col-xxl-2 data-column">
//                      <div class="card post-card">
//                         <img src="${dataImage}" alt="product-image" class="lazy card-img-top card-img" id="imageContainer">
//                         <div class="card-body body-card">
//                             <p class="card-text title"> ${dataTitle} </p><hr>
//                             <p class="price"> ₹${dataPrice} </p>
//                             <button class="buyNow">Buy Now</button>
//                         </div>
//                     </div>
//                 </div>`;
//       contentContainer.innerHTML += div;
//       console.log("thiss");
//     }

//     if (data.length < itemsPerPage) {
//       loadMoreButton.style.display = "none";
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
// document.querySelector('#my-nav-collapse');
document.querySelector('#my-nav-collapse').style.display = 'flex';

function collapser(){
  const nav = document.querySelector('#my-nav-collapse');

  if(nav.style.display === 'none'){
    nav.style.display = 'flex';

  }
  else{
    nav.style.display = 'none';
    
  }
  // if(nav.className === "nav-collapse"){
  //     nav.className += "active";
  //     console.log('systummm');
  // }
  // else{
  //     nav.className = "nav-collapse";
  //     console.log('else systummm');
  // }

}
