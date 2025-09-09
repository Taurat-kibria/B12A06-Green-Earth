
function manageSpinner(status){
    if(status === true){
        document.getElementById("spinner_id").classList.remove("hidden");
        document.getElementById("card_container_id").classList.add("hidden");
    }
    else{
        document.getElementById("spinner_id").classList.add("hidden");
        document.getElementById("card_container_id").classList.remove("hidden");
    }
}


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
         <div id="active_${element.id}"  onclick = "loadCard(${element.id})"
         class = "active text-[#57696c] text-xl py-2 pl-2
          hover:bg-[#15803d] hover:text-white
           rounded-sm">${element.category_name}</div>  
        `
        catContainer.appendChild(newCat);

        
        
    });
   

}

function loadCard(id) {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayCard(data.plants)
             giveColor(id)
       
       
            
        });
}



function loadCart(id) {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => displayCart(data.plants));
}

function remove_cart(plants){
    console.log(plants)
        document.getElementById(`cross_${plants}`).innerHTML = "";
    }

function displayCart(plants) {


    const cartContainer = document.getElementById("cart_id");
    const notunCart = document.createElement("div");
    notunCart.innerHTML =
        `
        <div id = "cross_${plants.id}" class="flex justify-between items-center
                 bg-[#f0fdf4] py-3 px-2 rounded-lg mb-3">
                    <div>
                        <h1 class="font-semibold mb-1">${plants.name}</h1>
                        <p class="text-[#57696c]">
                            ৳<span>${plants.price}</span> x <span>1</span>
                        </p>
                    </div>
                    <div>
                        <button onclick = "remove_cart(${plants.id})" class="text-[#57696c] ">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
        `
    cartContainer.appendChild(notunCart);

    const plantPrice = parseInt(plants.price);
    let precPrice = parseInt(document.getElementById("total_id").innerText);
    precPrice = plantPrice + precPrice;
    document.getElementById("total_id").innerText = precPrice;

    



}


function displayCard(plants) {
    const cardContainer = document.getElementById("card_container_id");
    cardContainer.innerHTML = "";
    plants.forEach(element => {
        const notunEl = document.createElement("div");
        notunEl.innerHTML = `
         <div  class="">
                    <div  class=" bg-white h-full rounded-lg space-y-4 p-4">
                        <img class=" w-full  max-h-[200px]  
                         rounded-md" src="${element.image}" alt="no img">
                        <p onclick = "loadModal(${element.id})" class="font-semibold text-xl ">${element.name}</p>

                        <p class="text-[#57696c]">
                            ${element.description}
                        </p>
                        <div class="flex  justify-between">
                            <div>
                                <button id="modal_btn_id" 
                                 class="btn btn-xs sm:btn-sm md:btn-md
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
    manageSpinner(false);
}


// modal funtion
function loadModal(id) {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => displaModal(data.plants))
}

// lants": {
// "id": 25,
// "image": "https://i.ibb.co.com/svtZJ7nw/money-plant-min.jpg",
// "name": "Money Plant",
// "description": "A popular indoor climber believed to bring prosperity. Thrives easily in soil or water with minimal care.",
// "category": "Climber",
// "price": 350

function displaModal(plants) {

    const modal = document.getElementById("modal_comp");
    modal.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML =
        `
        <h1 class = "text-2xl mb-5 font-bold">${plants.name}</h1>

        <p class = "font-semibold">${plants.description}</p>
        `
    modal.appendChild(div)
    document.getElementById("my_modal_5").showModal();
}

function giveColor(id){
    const catagors = document.querySelectorAll(".active");
    catagors.forEach(element => {
        
        element.classList.remove("stay_color")
    });
    
    document.getElementById(`active_${id}`).classList.add("stay_color")
    
}

loadCatagories();