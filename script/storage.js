"use strict";

// 1. Bổ sung Animation cho Sidebar
const sidebarNav = document.querySelector("#sidebar");

sidebarNav.addEventListener("click", function (e) {
  this.classList.toggle("active");
});

const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "#FF0000",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  bmi: "?",
  date: "2022-03-04T11:06:04.427Z",
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "#008000",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: true,
  sterilized: false,
  bmi: "?",

  date: "2022-03-04T11:06:41.554Z",
};

const breed1 = {
  name: "Tabby",
  type: "Cat",
};

const breed2 = {
  name: "Domestic Medium Hair",
  type: "Cat",
};

const breed3 = {
  name: "Mixed Breed",
  type: "Dog",
};

const breed4 = {
  name: "Domestic Short Hair",
  type: "Cat",
};

const breed5 = {
  name: "Terrier",
  type: "Dog",
};

const breed6 = {
  name: "Greyhound",
  type: "Dog",
};

const breed7 = {
  name: "Persian",
  type: "Cat",
};

const breed8 = {
  name: "Rottweiler",
  type: "Dog",
};

// Dữ liệu test mảng petArray
if (!getFromStorage("petArray")) {
  saveToStorage("petArray", [data1, data2]);
}

// Dữ liệu test mảng breedArray
if (!getFromStorage("breedArray")) {
  saveToStorage("breedArray", [
    breed1,
    breed2,
    breed3,
    breed4,
    breed5,
    breed6,
    breed7,
    breed8,
  ]);
}

const petArray = JSON.parse(getFromStorage("petArray"));
const breedArray = JSON.parse(getFromStorage("breedArray"));

function saveToStorage(key, value) {
  // localStorage.setItem(key, value);
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
  return localStorage.getItem(key) ?? defaultValue;
}
