import FormValidator from "./components/FormValidator.js";
import { openPopup, closePopup, closeByEscape } from "./utils.js";
import UserInfo from "./components/UserInfo.js";
import Card from "./components/Card.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";

const userInfo = new UserInfo({
  name: ".profile__name",
  job: ".profile__role",
});
const addButton = document.querySelector(".content__add");
const addPopup = document.querySelector("#add-popup");
const addCloseButton = addPopup.querySelector(".popup__close");
const addFormElement = addPopup.querySelector(".popup__form");
const placeInput = document.querySelector('.popup__input[name="place"]');
const linkInput = document.querySelector('.popup__input[name="link"]');
const editFormElement = document.querySelector("#edit-popup .popup__form");
const editButton = document.querySelector(".profile__edit");
const closeButton = document.querySelector(".popup__close");
const popup = document.querySelector("#edit-popup");

const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

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
  imagePopup.open(name, link);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

function openEditPopup() {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  roleInput.value = currentUserInfo.job;
  editFormValidator.resetValidation();
  openPopup(popup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const roleValue = roleInput.value;
  userInfo.setUserInfo({
    name: nameValue,
    job: roleValue,
  });
  closePopup(popup);
}

closeButton.addEventListener("click", () => closePopup(popup));
addCloseButton.addEventListener("click", () => closePopup(addPopup));
addButton.addEventListener("click", openAddPopup);
editButton.addEventListener("click", openEditPopup);
editFormElement.addEventListener("submit", handleProfileFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".elements__list"
);

initialCards.forEach((element) => {
  const cardElement = createCard(element);
  const elementsSection = document.querySelector(".elements");
  elementsSection.appendChild(cardElement);
});

function openAddPopup() {
  placeInput.value = "";
  linkInput.value = "";
  addFormValidator.resetValidation();
  openPopup(addPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const placeValue = placeInput.value;
  const linkValue = linkInput.value;

  const newCard = {
    name: placeValue,
    link: linkValue,
  };

  initialCards.push(newCard);
  const newCardElement = createCard(newCard);
  cardSection.addItem(newCardElement);
  closePopup(addPopup);
}

popup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
});

addPopup.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(addPopup);
  }
});

const imagePopupElement = document.querySelector("#image-popup");
imagePopupElement.addEventListener("click", function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(imagePopupElement);
  }
});

document.addEventListener("keydown", closeByEscape);
