"use strict";

const submitBtn = document.querySelector("#submit-btn");
const healthyBtn = document.querySelector("#healthy-btn");
const calcBMIBtn = document.querySelector("#calcBMI-btn");

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");

let healthyCheck = true;

let healthyPetArr = [];

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Form Input
  const data = {
    id: idInput.value.toUpperCase(),
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    bmi: "?",
    date: new Date().toISOString(),
  };
  // Validate dữ liệu

  // Không có trường nào bị nhập thiếu dữ liệu.
  const validate = validateData(data);
  function validateData(data) {
    // Đăt cờ isValid
    let isValid = true;

    // Kiểm tra ID
    if (data.id.trim() === "") {
      alert(`Please input for ${idInput.placeholder}`);
      isValid = false;
    }

    // Kiểm tra Name
    else if (data.name.trim() === "") {
      alert(`Please input for ${nameInput.placeholder}`);
      isValid = false;
    }

    // Kiểm tra Age
    // Trường Age chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Age must be between 1 and 15!".
    else if (isNaN(data.age)) {
      alert(`Please input for ${ageInput.placeholder}`);
      isValid = false;
    } else if (data.age < 1 || data.age > 15) {
      alert(`Age must be between 1 and 15!`);
      isValid = false;
    }

    // Kiểm tra Weight
    // Trường Weight chỉ được nhập giá trị trong khoảng 1 đến 15. Nếu không hợp lệ, hãy đưa ra thông báo "Weight must be between 1 and 15!".
    else if (isNaN(data.weight)) {
      alert(`Please input for ${weightInput.placeholder}`);
      isValid = false;
    } else if (data.weight < 1 || data.weight > 15) {
      alert(`Weight must be between 1 and 15!`);
      isValid = false;
    }

    // Kiểm tra length
    // Trường Length chỉ được nhập giá trị trong khoảng 1 đến 100. Nếu không hợp lệ, hãy đưa ra thông báo "Length must be between 1 and 100!".
    else if (isNaN(data.length)) {
      alert(`Please input for ${lengthInput.placeholder}`);
      isValid = false;
    } else if (data.length < 1 || data.length > 100) {
      alert(`Weight must be between 1 and 100!`);
      isValid = false;
    }

    // Kiểm tra Type
    // Bắt buộc phải chọn giá trị cho trường Type. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Type!".
    else if (data.type === "Select Type") {
      alert(`Please select Type!`);
      isValid = false;
    }

    // Kiểm tra Breed
    // Bắt buộc phải chọn giá trị cho trường Breed. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Breed!".
    else if (data.breed === "Select Breed") {
      alert(`Please select Breed!`);
      isValid = false;
    }

    // Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must unique!".
    for (let i = 0; i < petArray.length; i++) {
      if (petArray[i].id.toLowerCase() === data.id.toLowerCase()) {
        alert(`ID must unique!`);
        isValid = false;
      }
    }

    return isValid;
  }
  if (validate) {
    // Thêm thú cưng vào danh sách
    petArray.push(data);

    // Lưu dữ liệu vào LocalStorage
    saveToStorage("petArray", petArray);

    // Xóa các dữ liệu nhập trong Form Input
    clearInput();
    renderTableData(petArray);
  }
});
// Hiển thị danh sách thú cưng
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
            <td><button type="button" class="btn btn-danger" onclick="deletePet('${
              petArr[i].id
            }')">Delete</button>
            </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

renderTableData(petArray);

// Xóa các dữ liệu vừa nhập trên Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Xoá 1 thú cưng
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArray.length; i++) {
      if (petArray[i].id === petId) {
        petArray.splice(i, 1);

        saveToStorage("petArray", petArray);
      }
    }
  }
  renderTableData(petArray);
};

// Hiển thị danh sách thú cưng khoẻ mạnh
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    // Hàm kiểm tra và trả về thú cưng khoẻ mạnh
    function isHealthy(pet) {
      return pet.vaccinated && pet.dewormed && pet.sterilized;
    }

    // Lọc danh sách thú cưng khoẻ mạnh với hàm isHealthy và gán vào mảng healthyPetArr
    healthyPetArr = petArray.filter(isHealthy);

    // Hiển thị danh sách thú cưng khoẻ mạnh
    renderTableData(healthyPetArr);

    // Đổi Text nút Show Healthy Pet thành Show All Pet sau khi click.
    healthyBtn.textContent = "Show All Pet";

    // Gán lại healthCheck = false
    healthyCheck = false;
  } else {
    // Hiển thị danh sách tất cả thú cưng
    renderTableData(petArray);

    // Đổi Text nút Show All Pet thành Show Healthy Pet
    healthyBtn.textContent = "Show Healthy Pet";

    // Gán lại healthyCheck = true;
    healthyCheck = true;
  }
});

// Hiển thị Breed trong màn hình quản lý thú cưng
function renderBreed(breedArray) {
  breedInput.innerHTML = `<option>Select Breed</option>`;

  if (typeInput.value === "Dog") {
    breedArray
      .filter((breed) => breed.type === "Dog")
      .forEach((breed) => {
        const option = document.createElement("option");
        option.innerHTML = `
      <option>${breed.name}</option>
      `;
        breedInput.appendChild(option);
      });
  }

  if (typeInput.value === "Cat") {
    breedArray
      .filter((breed) => breed.type === "Cat")
      .forEach((breed) => {
        const option = document.createElement("option");
        option.innerHTML = `
      <option>${breed.name}</option>
      `;
        breedInput.appendChild(option);
      });
  }
}

typeInput.onchange = function () {
  renderBreed(breedArray);
};

// renderBreed(breedArray);
// Bắt sự kiện click vào button Calculate BMI
// calcBMIBtn.addEventListener("click", function () {
//   // Duyệt qua từng phần tử của mảng
//   for (let i = 0; i < petArray.length; i++) {
//     // Gán giá trị bmi với từng loại thú cưng theo công thức.
//     petArray[i].bmi =
//       petArray[i].type === "Dog"
//         ? ((petArray[i].weight * 703) / petArray[i].length ** 2).toFixed(2)
//         : ((petArray[i].weight * 886) / petArray[i].length ** 2).toFixed(2);
//   }

//   // Hiển thị danh sách tất cả thú cưng
//   renderTableData(petArray);
// });

// CÁC NGUỒN BÀI VIẾT ĐÃ THAM KHẢO
// Loại bỏ khoảng trắng trong chuỗi đã nhập
// https://www.w3schools.com/jsref/jsref_trim_string.asp
// https://www.w3schools.com/jsref/jsref_tolowercase.asp
// https://www.w3schools.com/jsref/jsref_tofixed.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
// padStart(targetLength, padString)
// => .toString().padStart(2, "0") để hiển thị thêm số 0 trước ngày, tháng từ 1 đến 9
