"use strict";

const findBtn = document.querySelector("#find-btn");
const tableBodyEl = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

function renderTableData(petArr) {
  // Xoá toàn bộ nội dung hiên có của bảng
  tableBodyEl.innerHTML = "";
  // Duyệt qua các phần tử trong mảng
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <th scope="row">${petArr[i].id}</th>
            <td>${petArr[i].name}</td>
            <td>${petArr[i].age}</td>
            <td>${petArr[i].type}</td>
            <td>${petArr[i].weight} kg</td>
            <td>${petArr[i].length} cm</td>
            <td>${petArr[i].breed}</td>
            <td>
              <i class="bi bi-square-fill" style="color: ${
                petArr[i].color
              }"></i>
            </td>
            <td><i class="bi bi-${
              petArr[i].vaccinated ? "check" : "x"
            }-circle-fill"></i></td>
            <td><i class="bi bi-${
              petArr[i].dewormed ? "check" : "x"
            }-circle-fill"></i></td>
            <td><i class="bi bi-${
              petArr[i].sterilized ? "check" : "x"
            }-circle-fill"></i></td>
            <td>${petArr[i].date.substring(8, 10)}/${petArr[i].date.substring(
      5,
      7
    )}/${petArr[i].date.substring(0, 4)}</td>
    `;
    tableBodyEl.appendChild(row);
  }
}

renderTableData(petArray);

// Hiển thị Breed trong màn hình quản lý thú cưng
function renderBreed(breedArray) {
  breedArray.forEach((breed) => {
    const option = document.createElement("option");
    option.innerHTML = `
      <option>${breed.name}</option>
      `;
    breedInput.appendChild(option);
  });
}

renderBreed(breedArray);

findBtn.addEventListener("click", function (e) {
  let petArraySearch = petArray;

  // Tìm kiếm theo ID
  if (idInput.value) {
    petArraySearch = petArraySearch.filter((pet) =>
      pet.id.toLowerCase().includes(idInput.value.toLowerCase())
    );
  }

  // Tìm kiếm theo tên
  if (nameInput.value) {
    petArraySearch = petArraySearch.filter((pet) =>
      pet.name.toLowerCase().includes(nameInput.value.toLowerCase())
    );
  }

  // Tìm kiếm theo loại
  if (typeInput.value !== "Select Type") {
    petArraySearch = petArraySearch.filter(
      (pet) => pet.type === typeInput.value
    );
  }

  // Tìm kiếm theo giống
  if (breedInput.value !== "Select Breed") {
    petArraySearch = petArraySearch.filter((pet) =>
      pet.breed.includes(breedInput.value)
    );
  }

  // Tìm kiếm theo trạng thái tiêm phòng
  if (vaccinatedInput.checked) {
    petArraySearch = petArraySearch.filter((pet) => pet.vaccinated);
  }

  // Tìm kiếm theo trạng thái trừ sán
  if (dewormedInput.checked) {
    petArraySearch = petArraySearch.filter((pet) => pet.dewormed);
  }

  // Tìm kiếm theo trạng thái phẫu thuật trị sản
  if (sterilizedInput.checked) {
    petArraySearch = petArraySearch.filter((pet) => pet.sterilized);
  }

  console.log(petArraySearch);
  renderTableData(petArraySearch);
});
