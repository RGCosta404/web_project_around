import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup, closeByEscape } from './utils.js';
const addButton = document.querySelector('.content__add');
const addPopup = document.querySelector('#add-popup');
const addCloseButton = addPopup.querySelector('.popup__close');
const addFormElement = addPopup.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input[name="place"]');
const linkInput = document.querySelector('.popup__input[name="link"]');
const editFormElement = document.querySelector('#edit-popup .popup__form');
const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('#edit-popup');

const profileName = document.querySelector('.profile__name');
const profileRole = document.querySelector('.profile__role');

const nameInput = document.querySelector('.popup__input[name="name"]');
const roleInput = document.querySelector('.popup__input[name="role"]'); 

const imagePopup = document.querySelector('#image-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const addFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button', 
  inputErrorClass: 'popup__input_type_error', 
  errorClass: 'popup__error_visible', 
  inactiveButtonClass: 'popup__button_disabled'
}, addFormElement);
addFormValidator.enableValidation();
const editFormValidator = new FormValidator({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__button_disabled'
}, editFormElement);
editFormValidator.enableValidation();

function openEditPopup() {
    nameInput.value = profileName.textContent;
    roleInput.value = profileRole.textContent;
    editFormValidator.resetValidation();
    openPopup(popup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const roleValue = roleInput.value;
    profileName.textContent = nameValue;
    profileRole.textContent = roleValue;
    closePopup(popup);
}

closeButton.addEventListener('click', () => closePopup(popup));
addCloseButton.addEventListener('click', () => closePopup(addPopup));
imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
addButton.addEventListener('click', openAddPopup);
editButton.addEventListener('click', openEditPopup);
editFormElement.addEventListener('submit', handleProfileFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);


const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
  }
];

function createCard(cardData) {
    const card = new Card(cardData, '#card-template');
    return card.generateCard();
}

initialCards.forEach(element => {
    const cardElement = createCard(element);
    const elementsSection = document.querySelector('.elements');
    elementsSection.appendChild(cardElement);
});

function openAddPopup() {
    placeInput.value = '';
    linkInput.value = '';
    addFormValidator.resetValidation();
    openPopup(addPopup);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();

    const placeValue = placeInput.value;
    const linkValue = linkInput.value;

    const newCard = {
        name: placeValue,
        link: linkValue
    };

    initialCards.push(newCard);
    const newCardElement = createCard(newCard);
    const elementsSection = document.querySelector('.elements');
    elementsSection.prepend(newCardElement);
    closePopup(addPopup)
}

popup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(popup);
    }
});

addPopup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(addPopup);
    }
});

imagePopup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(imagePopup);
    }
});

document.addEventListener('keydown', closeByEscape);
