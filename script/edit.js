"use strict";

const tableBodyEl = document.getElementById("tbody");
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
const submitBtn = document.querySelector("#submit-btn");
const formContainer = document.querySelector("#container-form");

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
            <td><button type="button" class="btn btn-warning" onclick="editPet('${
              petArr[i].id
            }')">Edit</button>
            </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

renderTableData(petArray);

// Edit 1 thú cưng
const editPet = (petId) => {
  const pet = petArray.find((p) => p.id === petId);
  console.log(pet);

  formContainer.classList.remove("hide");

  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  breedInput.options[breedInput.selectedIndex].text = pet.breed;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
};
// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  const isConform = confirm(`Bạn có chắc muốn cập nhật ?`);
  if (isConform) {
    // Lấy dữ liệu từ các Form Input
    const data = {
      id: idInput.value,
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
      // date: new Date(),
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
      // for (let i = 0; i < petArray.length; i++) {
      //   if (pet.id.toLowerCase() === data.id.toLowerCase()) {
      //     alert(`ID must unique!`);
      //     isValid = false;
      //   }
      // }

      return isValid;
    }
    if (validate) {
      // Cập nhật lại thú cưng

      // Tìm index của thú cưng cần cập nhật
      const petIndex = petArray.findIndex((p) => p.id === data.id);

      // Giữ lại ngày tháng đã thêm như cũ
      data.date = petArray[petIndex].date;

      // cập nhật lại vị trí pet trong mảng petArray = data
      petArray[petIndex] = data;

      // Lưu dữ liệu vào LocalStorage
      saveToStorage("petArray", petArray);

      // Ẩn form
      formContainer.classList.add("hide");

      // Thông báo cập nhật thành công
      alert(`Đã cập nhật thú cưng thành công !`);

      // Hiển thị lại thông tin sau khi cập nhật.
      renderTableData(petArray);
    }
  }
});
// Hiển thị Breed trong màn hình quản lý thú cưng
function renderBreed(breedArray) {
  breedInput.innerHTML = `<option>Select Breed</option>
        `;

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

// Nguồn tham khảo sử dụng trong ASM
// https://vn.got-it.ai/blog/lay-gia-tri-cua-the-select-trong-javascript
