import { recreospotService } from "./recreospot-service-client.js";
import { runError } from "./errors-csr.js";

const userId = document.querySelector("[data-user-id]").getAttribute("data-user-id");
const profileDOM = {
  firstName: document.getElementById("firstNameProfile"),
  lastName: document.getElementById("lastNameProfile"),
  email: document.getElementById("emailProfile"),
};

const formDOM = {
  email: document.getElementById("email"),
  password: document.getElementById("password"),
};

const profileEventDOM = document.querySelector(".profile-event");

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("profile__button")) {
    recreospotService.deleteUser(userId);
  }
  if (e.target.classList.contains("form__button")) {
    if (formDOM.email.value === "" || formDOM.password.value === "") {
      profileEventDOM.innerText = "The values are empty!";
      return;
    }

    try {
      const dataUpdated = {
        firstName: profileDOM.firstName.innerText,
        lastName: profileDOM.lastName.innerText,
        email: formDOM.email.value,
        password: formDOM.password.value,
      };
      const userUpdated = await recreospotService.updateUser(userId, dataUpdated);
      profileDOM.email.innerText = userUpdated.email;

      profileEventDOM.innerText = "Profile updated!";

      formDOM.email.value = "";
      formDOM.password.value = "";
    } catch (error) {
      const { errors } = error.response.data;
      runError(errors);
    }
  }
});
