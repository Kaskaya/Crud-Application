const data = [];

const nameInput = document.querySelector(".name");
const lastNameInput = document.querySelector(".lastname");
const mailInput = document.querySelector(".mail");
const submitButton = document.querySelector(".submit-button");
const userList = document.querySelector(".user-list");

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  const lastname = lastNameInput.value;
  const mail = mailInput.value;

  if (name && lastname && mail) {
    const users = { name, lastname, mail };
    data.push(users);
    renderUserList();
    nameInput.value = "";
    lastNameInput.value = "";
    mailInput.value = "";
  }
});

function renderUserList() {
  userList.innerHTML = "";
  data.forEach((user, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${user.name} ${user.lastname} ${user.mail}
    <button class="delete-button" data-index="${index}" >Delete</button>
    <button class="edit-button" data-index="${index}" >Edit</button> `;
    userList.appendChild(li);
  });
}

userList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-button")) {
    const dataIndex = e.target.getAttribute("data-index");
    const newName = prompt("Edit First Name", data[dataIndex].name);
    const newLastName = prompt("Edit Last Name", data[dataIndex].lastname);
    const newMail = prompt("Edit Mail", data[dataIndex].mail);
    data[dataIndex].name = newName;
    data[dataIndex].lastname = newLastName;
    data[dataIndex].mail = newMail;
    renderUserList();
  } else if (e.target.classList.contains("delete-button")) {
    const dataIndex = e.target.getAttribute("data-index");
    data.splice(dataIndex, 1);
    renderUserList();
  }
});
