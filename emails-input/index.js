const uniq = () => Math.random().toString(36).substr(2, 9);

class EmailList {
  constructor() {
    this.emails = new Map();
  }

  validEmail(email) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(email);
  }

  getEmails() {
    return Array.from(this.emails, ([name, value]) => ({
      email: value.value,
      valid: value.valid,
    }));
  }

  getEmailCount() {
    return this.emails.size;
  }

  getLastItem() {
    return Array.from(this.emails)[this.emails.size - 1][0];
  }

  addEmail(email) {
    const key = uniq();
    this.emails.set(key, {
      value: email,
      valid: this.validEmail(email),
    });
    return key;
  }

  removeEmail(key) {
    this.emails.delete(key);
  }
}

const removeEmail = ({ emailList, key }) => {
  emailList.removeEmail(key);
  const emailBlock = document.querySelector(`[data-email-key="${key}"]`);
  emailBlock.remove();
};

const insertEmail = ({ parentNode, inputNode, email, emailList }) => {
  const key = emailList.addEmail(email);
  const valid = emailList.validEmail(email);
  const removeEmailCb = () => {
    emailList.removeEmail(key);
  };

  const emailElement = document.createElement("div");
  emailElement.classList.add("email-item");
  emailElement.classList.add(valid ? "valid" : "invalid");
  emailElement.dataset.emailKey = key;
  emailElement.textContent = email;

  const removeEmailIcon = document.createElement("img");
  removeEmailIcon.src = "./emails-input/assets/remove.svg";
  removeEmailIcon.classList.add("remove-email");
  removeEmailIcon.addEventListener("click", () =>
    removeEmail({ emailList, key })
  );
  emailElement.append(removeEmailIcon);

  parentNode.insertBefore(emailElement, inputNode);
};

const EmailsInput = (node) => {
  const componentContainer = document.createElement("div");
  componentContainer.classList.add("emails-input-container");

  const emailList = new EmailList();

  const inputElement = document.createElement("input");
  inputElement.classList.add("email-input");
  inputElement.setAttribute("autofocus", true);
  inputElement.setAttribute("placeholder", "add more people...");

  const addEmail = (email) =>
    insertEmail({
      parentNode: componentContainer,
      inputNode: inputElement,
      email,
      emailList,
    });

  const events = ["blur", "paste", "keydown"];
  events.forEach((event) =>
    inputElement.addEventListener(event, (e) => {
      if (
        e.keyCode === 13 ||
        e.keyCode === 44 ||
        e.keyCode === 32 ||
        event === "blur" ||
        event === "paste"
      ) {
        if (event === "paste" || e.keyCode === 44 || e.keyCode === 32)
          e.preventDefault();

        const emailVal =
          event === "paste" ? e.clipboardData.getData("text") : e.target.value;

        if (!emailVal) return;
        const emails = emailVal.split(",").map((e) => e.trim());
        emails.forEach((email) => addEmail(email));
        e.target.value = "";
      }
      if (e.keyCode === 8 && e.target.value === "") {
        removeEmail({ emailList, key: emailList.getLastItem() });
      }
    })
  );

  componentContainer.append(inputElement);
  node.append(componentContainer);

  // Functions to expose
  const getEmails = () => emailList.getEmails();
  const getEmailCount = () => emailList.getEmailCount();

  return {
    getEmails,
    getEmailCount,
    addEmail,
  };
};
