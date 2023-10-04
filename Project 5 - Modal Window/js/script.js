"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");
const showModalsBtn = document.querySelectorAll(".show-modal");

const closeModal = function () {
  overlay.classList.add("hidden");
  modal.classList.add("hidden");
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

showModalsBtn.forEach((showModal) => {
  showModal.addEventListener("click", openModal);
});

overlay.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
