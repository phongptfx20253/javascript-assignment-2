"use strict";

const submitBtn = document.querySelector("#submit-btn");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const tableBodyEl = document.getElementById("tbody");

// Hiển thị danh sách Breed
function renderBreedTable(breedArr) {
  // Xoá toàn bộ nội dung hiên có của bảng
  tableBodyEl.innerHTML = "";
  // Duyệt qua các phần tử trong mảng
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${breedArr[i].name}</td>
            <td>${breedArr[i].type}</td>
            <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${
              breedArr[i].name
            }')">Delete</button>
            </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

// Gọi hàm hiển thị danh sách Breed
renderBreedTable(breedArray);

// Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function (e) {
  // Lấy dữ liệu từ các Form Input
  const breed = {
    name: breedInput.value,
    type: typeInput.value,
  };

  const validate = validateData(breed);

  function validateData(data) {
    // Đăt cờ isValid
    let isValid = true;

    // Kiểm tra Breed
    // Bắt buộc phải chọn giá trị cho trường Breed. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Breed!".
    if (data.name === "") {
      alert(`Please input Breed!`);
      isValid = false;
    }

    // Kiểm tra Type
    // Bắt buộc phải chọn giá trị cho trường Type. Nếu không hợp lệ, hãy đưa ra thông báo "Please select Type!".
    else if (data.type === "Select Type") {
      alert(`Please select Type!`);
      isValid = false;
    }

    return isValid;
  }

  if (validate) {
    // Thêm thú cưng vào danh sách
    breedArray.push(breed);

    // Lưu dữ liệu vào LocalStorage
    saveToStorage("breedArray", breedArray);

    // Xóa các dữ liệu nhập trong Form Input
    clearInput();
    renderBreedTable(breedArray);
  }
});

function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

// Xoá 1 breed
const deleteBreed = (breedName) => {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    for (let i = 0; i < breedArray.length; i++) {
      if (breedArray[i].name === breedName) {
        breedArray.splice(i, 1);
      }
    }
  }
  // Lưu dữ liệu vào LocalStorage
  saveToStorage("breedArray", breedArray);
  renderBreedTable(breedArray);
};
