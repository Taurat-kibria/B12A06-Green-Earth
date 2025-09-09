
const loadCatagories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => displayCatagories(data.categories))
}



function displayCatagories(cats) {
    const catContainer = document.getElementById("cat_container")
    cats.forEach(element => {

        const newCat = document.createElement("div");
        newCat.innerHTML = `
         <div onclick = "loadCard(${element.id})"
         class = "text-[#57696c] text-xl
         ">${element.category_name}</div>  
        `
        catContainer.appendChild(newCat);
    });

}

function loadCard(id) {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCard(data.plants));
}

// lants": {
// "id": 25,
// "image": "https://i.ibb.co.com/svtZJ7nw/money-plant-min.jpg",
// "name": "Money Plant",
// "description": "A popular indoor climber believed to bring prosperity. Thrives easily in soil or water with minimal care.",
// "category": "Climber",
// "price": 350

function loadCart(id) {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => displayCart(data.plants));
}

function displayCart(plants) {


    const cartContainer = document.getElementById("cart_id");
    const notunCart = document.createElement("div");
    notunCart.innerHTML =
        `
        <div class="flex justify-between items-center
                 bg-[#f0fdf4] py-3 px-2 rounded-lg">
                    <div>
                        <h1 class="font-semibold mb-1">${plants.name}</h1>
                        <p class="text-[#57696c]">
                            ৳<span>${plants.price}</span> x <span>1</span>
                        </p>
                    </div>
                    <div>
                        <button class="text-[#57696c] ">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
        `
    cartContainer.appendChild(notunCart);
}

function displayCard(plants) {
    const cardContainer = document.getElementById("card_container_id");
    cardContainer.innerHTML = "";
    plants.forEach(element => {
        const notunEl = document.createElement("div");
        notunEl.innerHTML = `
         <div class="">
                    <div class=" bg-white h-full rounded-lg space-y-4 p-4">
                        <img class=" w-full  max-h-[200px]  
                         rounded-md" src="${element.image}" alt="no img">
                        <p class="font-semibold text-xl ">${element.name}</p>

                        <p class="text-[#57696c]">
                            ${element.description}
                        </p>
                        <div class="flex justify-between">
                            <div>
                                <button class="btn btn-xs sm:btn-sm md:btn-md
                                lg:btn-lg xl:btn-xl bg-[#dcfce7] rounded-full
                                text-lg text-[#15803d] py-4 px-5 border-none h-8">
                                    ${element.category}
                                </button>
                            </div>

                            <div>
                                <p class="font-semibold text-xl">
                                    ৳<span>${element.price}</span>
                                </p>
                            </div>

                        </div>

                        <button onclick = "loadCart(${element.id})" 
                            class="btn btn-xs sm:btn-sm md:btn-md
                                lg:btn-lg xl:btn-xl bg-[#15803d] rounded-full
                                text-lg text-white py-4 px-5 border-none h-11 w-full">
                                Add to Cart
                            </button>
                    </div>

                </div>
         `

        cardContainer.appendChild(notunEl);
    });
}



loadCatagories();