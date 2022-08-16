const starsEl = document.querySelectorAll(".fa-star")
const emojisEl = document.querySelectorAll(".far")
// console.log(starsEl);
const collorsList = ["red", "orange", "lightblue", "lightgreen", "green"];


updateRating(0);
starsEl.forEach((starEl, index) => {
    starEl.addEventListener("click", ()=>{
        updateRating(index);
        // console.log(index);
    })
});

function updateRating(index){
    starsEl.forEach((starEl, idx)=>{
        if(idx <= index){
            // console.log(starEl.classList, idx);
            starEl.classList.add("active")
            // console.log(starEl.classList, idx);
        }else{
            starEl.classList.remove("active");
        }
    });
    emojisEl.forEach((emojiEl) => {
        // console.log(emojiEl);
        emojiEl.style.transform = `translateX(-${index * 50}px)`;
        emojiEl.style.color = collorsList[index];
    })
    
}