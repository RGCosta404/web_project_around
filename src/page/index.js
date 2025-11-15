import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const confirmationPopup = new PopupWithConfirmation("#confirmation-popup");
confirmationPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "ea230205-bcfb-4ccb-940b-03d9c5173331",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__role",
});

const addPopupElement = document.querySelector("#add-popup");
const addFormElement = addPopupElement.querySelector(".popup__form");
const placeInput = addPopupElement.querySelector('.popup__input[name="place"]');
const linkInput = addPopupElement.querySelector('.popup__input[name="link"]');
const editFormElement = document.querySelector("#edit-popup .popup__form");
const editButton = document.querySelector(".profile__edit");
const addButton = document.querySelector(".content__add");
const editPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);
const addPopup = new PopupWithForm("#add-popup", handleAddFormSubmit);

const nameInput = document.querySelector('.popup__input[name="name"]');
const roleInput = document.querySelector('.popup__input[name="role"]');

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
const addFormValidator = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    inactiveButtonClass: "popup__button_disabled",
  },
  addFormElement
);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator(
  {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
    inactiveButtonClass: "popup__button_disabled",
  },
  editFormElement
);
editFormValidator.enableValidation();

function handleCardClick(name, link) {
  imagePopup.open(link, name);
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardClick,
    handleDeleteConfirmation,
    handleLikeClick
  );
  return card.generateCard();
}

function openEditPopup() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  roleInput.value = currentUserInfo.job;
  editFormValidator.resetValidation();
  editPopup.open();
}

function handleProfileFormSubmit(inputValues) {
  editPopup.renderLoading(true);

  const nameValue = inputValues.name;
  const roleValue = inputValues.role;

  api
    .updateProfile(nameValue, roleValue)
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
      });
      editPopup.close();
    })
    .catch((err) => {})
    .finally(() => {
      editPopup.renderLoading(false);
    });
}

let cardSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });

    const avatarImage = document.querySelector(".content__profile-avatar");
    avatarImage.src = userData.avatar;

    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          return cardElement;
        },
      },
      ".elements"
    );

    cardSection.renderItems();
  })
  .catch((err) => {});

function openAddPopup() {
  placeInput.value = "";
  linkInput.value = "";
  addFormValidator.resetValidation();
  addPopup.open();
}

function handleAddFormSubmit(inputValues) {
  addPopup.renderLoading(true);

  const placeValue = inputValues.place;
  const linkValue = inputValues.link;

  api
    .addCard(placeValue, linkValue)
    .then((newCard) => {
      const newCardElement = createCard(newCard);
      cardSection.addItem(newCardElement);
      addPopup.close();
    })
    .catch((err) => {})
    .finally(() => {
      addPopup.renderLoading(false);
    });
}

editPopup.setEventListeners();
addPopup.setEventListeners();
editButton.addEventListener("click", openEditPopup);
addButton.addEventListener("click", openAddPopup);

function handleDeleteConfirmation(cardId, cardElement) {
  confirmationPopup.open();
  confirmationPopup.setAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmationPopup.close();
      })
      .catch((err) => {});
  });
}

function handleAvatarFormSubmit(inputValues) {
  avatarPopup.renderLoading(true);

  const avatarValue = inputValues.avatar;

  api
    .updateAvatar(avatarValue)
    .then((result) => {
      const avatarImage = document.querySelector(".content__profile-avatar");
      avatarImage.src = result.avatar;
      avatarPopup.close();
    })
    .catch((err) => {})
    .finally(() => {
      avatarPopup.renderLoading(false);
    });
}

const avatarPopup = new PopupWithForm("#avatar-popup", handleAvatarFormSubmit);
avatarPopup.setEventListeners();

const avatarContainer = document.querySelector(
  ".content__profile-avatar-container"
);
avatarContainer.addEventListener("click", () => {
  avatarPopup.open();
});

function handleLikeClick(cardId, isLiked) {
  if (isLiked) {
    api
      .unlikeCard(cardId)
      .then((updatedCard) => {})
      .catch((err) => {});
  } else {
    api
      .likeCard(cardId)
      .then((updatedCard) => {})
      .catch((err) => {});
  }
}
