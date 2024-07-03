
// $(document).ready(function () {
//     $('.homepageslider').owlCarousel({
//         loop: false,
//         margin: 15,
//         autoplay: true,
//         autoplaySpeed: 500,
//         rewind: true,
//         responsiveClass: true,
//         autoplayHoverPause: true,
//         responsive: {
//             0: {
//                 items: 1,
//                 nav: false
//             },
//             320: {
//                 items: 1,
//                 nav: false
//             },
//             600: {
//                 items: 1,
//                 nav: false
//             },
//             780: {
//                 items: 1,
//                 nav: false
//             },
//             991: {
//                 items: 1,
//                 nav: false

//             },
//             1200: {
//                 items: 1,
//                 nav: false
//             },
//             1400: {
//                 items: 1,
//                 nav: false
//             },
//             1550: {
//                 items: 1,
//                 nav: false
//             }
//         }
//     });
//     $('.lootdealHome').owlCarousel({
//         loop: false,
//         margin: 15,
//         autoplay: true,
//         autoplaySpeed: 500,
//         rewind: true,
//         responsiveClass: true,
//         autoplayHoverPause: true,
//         responsive: {
//             0: {
//                 items: 1,
//                 nav: false
//             },
//             320: {
//                 items: 2,
//                 nav: false
//             },
//             600: {
//                 items: 2,
//                 nav: false
//             },
//             780: {
//                 items: 4,
//                 nav: false
//             },
//             991: {
//                 items: 5,
//                 nav: false

//             },
//             1200: {
//                 items: 6,
//                 nav: false
//             },
//             1400: {
//                 items: 6,
//                 nav: false
//             },
//             1550: {
//                 items: 8,
//                 nav: false
//             }
//         }
//     });
//     $('.owl-carousel').owlCarousel({
//         loop: false,
//         margin: 15,
//         autoplay: true,
//         autoplaySpeed: 500,
//         rewind: true,
//         responsiveClass: true,
//         autoplayHoverPause: true,
//         responsive: {
//             0: {
//                 items: 1,
//                 nav: false
//             },
//             320: {
//                 items: 2,
//                 nav: false
//             },
//             600: {
//                 items: 2,
//                 nav: false
//             },
//             780: {
//                 items: 4,
//                 nav: false
//             },
//             991: {
//                 items: 5,
//                 nav: false

//             },
//             1200: {
//                 items: 6,
//                 nav: false
//             },
//             1400: {
//                 items: 6,
//                 nav: false
//             },
//             1550: {
//                 items: 8,
//                 nav: false
//             }
//         }
//     });

//     var itemsCount = 0,
//         itemsMax = $('#maindiv div.col-sm-6').length;
//     $('#maindiv div.col-sm-6').hide();

//     function showNextItems() {
//         var pagination = 20;

//         for (var i = itemsCount; i < (itemsCount + pagination); i++) {
//             $('#maindiv div.col-sm-6:eq(' + i + ')').show(1500);
//         }

//         itemsCount += pagination;

//         if (itemsCount > itemsMax) {
//             $('#showMore').hide();
//         }
//     };

//     showNextItems();

//     $('#showMore').on('click', function (e) {
//         e.preventDefault();
//         showNextItems();
//     });
// });



// // Get DOM elements
// const cardsContainer = document.querySelector('.cards-container');

// // Calculate the width of each card
// const cardWidth = document.querySelector('.card').offsetWidth;

// // Set initial position and index
// let position = 0;
// let currentIndex = 0;

// // Function to slide the cards
// function slideCards() {
//   position -= cardWidth;
//   currentIndex++;

//   // Apply transform to slide the cards
//   cardsContainer.style.transform = `translateX(${position}px)`;

//   // Reset position and index when reaching the end
//   if (currentIndex >= cardsContainer.children.length) {
//     position = 0;
//     currentIndex = 0;
//     cardsContainer.style.transform = `translateX(${position}px)`;
//   }
// }

// // Start automatic sliding every 3 seconds
// const interval = setInterval(slideCards, 3000);

// // Stop automatic sliding when hovering over the slider
// cardsContainer.addEventListener('mouseenter', () => {
//   clearInterval(interval);
// });

// // Resume automatic sliding when not hovering
// cardsContainer.addEventListener('mouseleave', () => {
//   interval = setInterval(slideCards, 3000);
// });


const dataRow = document.querySelectorAll('.data-row');
const container = document.querySelector('.data-container');
let noResults = document.querySelector('.no-results');
let noHeading = document.querySelector('.no-heading');



fetch('https://reqres.in/api/users')
    .then(res => {

        if (!res.ok) {
            console.log("Problem");
            return;
        }
        return res.json();
    })
    .then(data => {
        // console.log(data);
        dataRow.forEach((element) => {
            for (i = 0; i < data.data.length; i++) {
                const img = data.data[i].avatar;
                let name = data.data[i].first_name;
                name += " " + data.data[i].last_name;
                // const row = document.querySelector('.row ');
                // const row = document.getElementsByClassName('.row ');

                const colDiv = document.createElement('div');
                colDiv.classList = 'col-sm-8';

                const card = `
                <div class="card h-100 post-card" >
                    <a href="" onclick="redirect();">
                        <img src= ${img} class="card-img-top card-img" alt="item-image">
                    </a>
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                                <p class="card-text">${data.data[i].email}.</p>
                        </div>
                    </div>
                 `;

                colDiv.innerHTML += card;
                // row.appendChild(div);

                // dataRow.forEach((element) => {
                // console.log(element);
                element.appendChild(colDiv);
                // });
            }
        });


    })
    .catch(error => console.log(error));


// For search box
const input = document.querySelector(".search-input");
// const input = document.getElementById("input-form");
const button = document.querySelector(".search-btn");
const heading = document.querySelector(".heading");

// input.addEventListener("keyup", (e) => {
//     // e.preventDefault();
//     if (e.code === "Enter") {
//         button.click();
//         // return false;   
//     }
// });

button.addEventListener('click', () => {
    if (input.value == "") return;
    // console.log("button pressed");
    const searchTerm = input.value.toLowerCase();
    // console.log(searchTerm);
    container.innerHTML = "";
    heading.innerHTML = "";


    fetch('https://reqres.in/api/users')
        .then((res) => {
            if (!res.ok) {
                throw new Error('404 error');
            }
            return res.json();
        })
        .then((data) => {
            var matchingData = data.data.filter((item) => {
                // console.log(item.first_name);
                return item.first_name.toLowerCase().includes(searchTerm) || item.last_name.toLowerCase().includes(searchTerm) || item.email.toLowerCase().includes(searchTerm);
            });

            heading.innerText = `Showing results for '${input.value}'`;
            if (matchingData.length > 0) {
                noResults.classList.remove("show");

                const row = document.createElement('div');
                row.classList = 'row row-cols-2 row-cols-md-4 row-cols-lg-4 g-4 data-row';



                for (i = 0; i < matchingData.length; i++) {
                    const img = matchingData[i].avatar;
                    let name = matchingData[i].first_name;
                    name += " " + matchingData[i].last_name;
                    // const row = document.querySelector('.row ');
                    // const row = document.getElementsByClassName('.row ');


                    const colDiv = document.createElement('div');
                    colDiv.classList = 'col-sm-8';

                    const card = `
                    <div class="card h-100 post-card" >
                            <img src= ${img} class="card-img-top card-img" alt="item-image">
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${data.data[i].email}.</p>
                            </div>
                    </div>
                    `;

                    colDiv.innerHTML += card;
                    // console.log(colDiv);
                    row.appendChild(colDiv);
                    container.appendChild(row);
                }
            }

            else {

                noResults.classList.add("show");
                noHeading.innerText = `No Results found for '${input.value}'`;
                // console.log(noResults);
            }


        }).catch(error => console.log(error));
});


// for the up arraw button
let toTop = document.querySelector(' .to-top ');
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        toTop.classList.add("active");
    }
    else {
        toTop.classList.remove("active");
    }
});


// function redirect() {
//     window.location.assign('https://www.amazon.in/');
// }


// const totop = document.querySelector(' .to-top ');
// const toTop = document.getElementById("#to-top");
// const toTop = document.getElementById('fas');
// console.log(totop);
// window.addEventListener("scroll", () => {
//         if((window.scrollY || document.documentElement.scrollTop) < 10){
//             // toTop.style.opacity = 0;
//             // toTop.style.disply = "none";
//             toTop.classList.add(".active");
//         }
//         else {
//             // toTop.style.opacity = 1;
//             toTop.classList.remove(".active");
//         }
// });

