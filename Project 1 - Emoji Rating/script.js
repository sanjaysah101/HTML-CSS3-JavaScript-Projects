const starsEl = document.querySelectorAll(".fa-star");
const emojisEl = document.querySelectorAll(".far");
const containerRating = document.querySelector(".rating-container");
const containerEmoji = document.getElementsByClassName("emoji-container");
const colorsList = ["red", "orange", "lightblue", "lightGreen", "green"];

updateRating(0);

containerRating.addEventListener("click", (e) => {
  const elementStarIndex = e.target.dataset.index;
  updateRating(elementStarIndex);
});

function updateRating(index) {
  starsEl.forEach((starEl, idx) => {
    if (idx <= index) {
      starEl.classList.add("active");
    } else {
      starEl.classList.remove("active");
    }
  });
  emojisEl.forEach((emojiEl) => {
    emojiEl.style.transform = `translateX(-${index * 50}px)`;
    emojiEl.style.color = colorsList[index];
  });
}
