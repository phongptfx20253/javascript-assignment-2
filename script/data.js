"use strict";

const exportBtn = document.querySelector("#export-btn");
const importBtn = document.querySelector("#import-btn");
const inputFile = document.getElementById("input-file");

// Bắt sự kiện click vào nút Export
exportBtn.addEventListener("click", function (e) {
  let isConform = confirm(`Bạn muốn xuất dữ liệu thú cưng?`);

  if (isConform) {
    // Tạo chuỗi JSON từ dữ liệu các thú cưng
    const json = JSON.stringify(petArray);

    // Tạo một đối tượng Blob từ chuỗi JSON
    const blob = new Blob([json], { type: "application/json" });

    // Tải xuống file JSON
    saveAs(blob, "PetData.json");
  }
});

// Hàm ImportData
function importData() {
  // Kiểm tra xem đã chọn file chưa?
  if (!inputFile.value) {
    alert(`Vui lòng chọn file cần Import !`);
  } else {
    // Sử dụng phương thức files của thẻ input để lấy File tương ứng với file JSON đã được chọn
    const file = inputFile.files[0];

    // Sử dụng phương thức FileReader để đọc nội dung của file JSON và chuyển đổi nó thành một đối tượng JavaScript.
    const reader = new FileReader();

    reader.onload = () => {
      const data = JSON.parse(reader.result);

      // Lưu dữ liệu vào LocalStorage
      saveToStorage("petArray", data);
      alert(`Import thành công !`);
    };

    // Đọc file
    if (file) reader.readAsText(file);

    inputFile.value = "";
  }
}

// Bắt sự kiện click nút Import, khi click sẽ gọi hàm importData
importBtn.addEventListener("click", importData);
