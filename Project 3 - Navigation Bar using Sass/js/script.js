const hamburger = document.querySelector(".hamburger");
const cross = document.querySelector(".cross");
const navicons = document.querySelectorAll(".nav-icons");
const mainMenu = document.querySelector(".main-menu");
const mobileSearchIcon = document.querySelector(".mobile-search-icon");
const floatingSearch = document.querySelector(".float-search");
floatingSearch.classList.toggle("hide");
cross.classList.add("hide");

mobileSearchIcon.addEventListener("click", ()=>{
    floatingSearch.classList.toggle("hide");
})

navicons.forEach(navIcon => {
    navIcon.addEventListener("click", () => {
        hamburger.classList.toggle("hide");
        cross.classList.toggle("hide");
        mainMenu.classList.toggle("mobile-menu");
    })
})

//copyright
document.querySelector("#copyrightYear").textContent = `  ${(new Date()).getFullYear()}`;

//search bar

const searchbar = document.querySelectorAll(".searchbar");
searchbar.forEach(search =>{
    search.addEventListener("input", ()=>{    
        console.log(search.value);
    })
})
