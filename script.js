const data = [];

const nameInput = document.querySelector(".name");
const lastNameInput = document.querySelector(".lastname");
const mailInput = document.querySelector(".mail");
const submitButton = document.querySelector(".submit-button");

submitButton.addEventListener("click", () => {
  const name = nameInput.value;
  const lastname = lastNameInput.value;
  const mail = mailInput.value;

  if (name && lastname && mail) {
    const userlist = { name, lastname, mail };
    data.push(userlist);
    nameInput.value = "";
    lastNameInput.value = "";
    mailInput.value = "";
  }
});
