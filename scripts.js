const shareButton = document.getElementById("shareButton");
const modalOverlay = document.querySelector(".modal-overlay");
const modal = document.querySelector(".modal");

const addRandomEmail = (addEmail) => add;
shareButton.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});
modalOverlay.addEventListener("click", (e) => {
  modalOverlay.style.display = "none";
});
modal.addEventListener("click", (e) => {
  e.stopPropagation();
});

const inputContainerNode = document.querySelector("#emails-input");
const emailsInput = EmailsInput(inputContainerNode);

const addEmailButton = document.getElementById("addEmail");
addEmailButton.addEventListener("click", () =>
  emailsInput.addEmail(`email-${Math.round(Math.random() * 1000)}@abc.com`)
);

const getEmailCountButton = document.getElementById("getEmailCount");
getEmailCountButton.addEventListener("click", () =>
  alert(emailsInput.getEmailCount())
);
