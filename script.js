const data = JSON.parse(localStorage.getItem("data")) || [];

const nameInput = document.querySelector(".name");
const lastNameInput = document.querySelector(".lastname");
const mailInput = document.querySelector(".mail");
const submitButton = document.querySelector(".submit-button");
const userList = document.querySelector(".user-list");
const search = document.querySelector("#search");

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  const lastname = lastNameInput.value;
  const mail = mailInput.value;
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (name && lastname && mail.match(pattern)) {
    const users = { name, lastname, mail };
    data.push(users);
    updateLocalStorage();
    renderUserList();
    nameInput.value = "";
    lastNameInput.value = "";
    mailInput.value = "";
  } else {
    alert("Please fill the required spaces");
  }
});

function renderUserList() {
  userList.innerHTML = "";
  data.forEach((user, index) => {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.innerHTML = `<h2><span class="usernames">${user.name} ${user.lastname}</span> ${user.mail}</h2>
    <button class="edit-button" data-index="${index}" >Edit</button>
    <button class="delete-button" data-index="${index}" >Delete</button> `;
    userList.appendChild(li);
  });
}

userList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-button")) {
    const dataIndex = e.target.getAttribute("data-index");
    const newName = prompt("Edit First Name", data[dataIndex].name);
    const newLastName = prompt("Edit Last Name", data[dataIndex].lastname);
    const newMail = prompt("Edit Mail", data[dataIndex].mail);
    if (newName !== null && newLastName !== null && newMail !== null) {
      data[dataIndex].name = newName;
      data[dataIndex].lastname = newLastName;
      data[dataIndex].mail = newMail;
      search.value = "";
    }
    updateLocalStorage();
    renderUserList();
  } else if (e.target.classList.contains("delete-button")) {
    const dataIndex = e.target.getAttribute("data-index");
    data.splice(dataIndex, 1);
    updateLocalStorage();
    renderUserList();
    search.value = "";
  }
});

function updateLocalStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-item");
  listItems.forEach((item) => {
    let text = item.textContent;
    if (text.toLowerCase().includes(value)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

renderUserList();
