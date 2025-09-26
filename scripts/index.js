const addButton = document.querySelector('.content__add');
const addPopup = document.querySelector('#add-popup');
const addCloseButton = addPopup.querySelector('.popup__close');
const addFormElement = addPopup.querySelector('.popup__form');

const placeInput = document.querySelector('.popup__input[name="place"]');
const linkInput = document.querySelector('.popup__input[name="link"]');
const formElement = document.querySelector('.popup__form');
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

function openPopup() {
    nameInput.value = profileName.textContent;
    roleInput.value = profileRole.textContent;

    popup.style.display = 'flex';
}

function closePopup() {
    popup.style.display = 'none';
}

function handleProfileFormSubmit(evt) {
    
    evt.preventDefault();


   const nameValue = nameInput.value;
   const roleValue = roleInput.value;

    profileName.textContent = nameValue;
    profileRole.textContent = roleValue;

    closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleProfileFormSubmit);

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

initialCards.forEach(element => {
    const cardElement = createCard(element);
    const elementsSection = document.querySelector('.elements');

    const likeButton = cardElement.querySelector('.elements__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('elements__like-active');
    });
    
    elementsSection.appendChild(cardElement);
});

function openAddPopup() {
    placeInput.value = '';
    linkInput.value = '';
    addPopup.style.display = 'flex';
}
function closeAddPopup() {
    addPopup.style.display = 'none';
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
    closeAddPopup();
}
addButton.addEventListener('click', openAddPopup);
addCloseButton.addEventListener('click', closeAddPopup);
addFormElement.addEventListener('submit', handleAddFormSubmit);

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template');
    const cardElement = cardTemplate.content.cloneNode(true);

    const imageElement = cardElement.querySelector('.elements__image');
    imageElement.src = cardData.link;
    imageElement.alt = `Imagem de ${cardData.name}`;
    imageElement.addEventListener('click', () => {
        openImagePopup(cardData.link, cardData.name);
    });

    const placeElement = cardElement.querySelector('.elements__place');
    placeElement.textContent = cardData.name;


    const deleteButton = cardElement.querySelector('.elements__delete-button');
    deleteButton.addEventListener('click', () => {
        deleteButton.closest('.elements__card').remove();
    });
    return cardElement;


}

function openImagePopup(imageSrc, imageAlt) {
    imagePopupImage.src = imageSrc;
    imagePopupImage.alt = imageAlt;
    imagePopupCaption.textContent = imageAlt;
    imagePopup.style.display = 'flex';
}

function closeImagePopup() {
    imagePopup.style.display = 'none';
}

imagePopupCloseButton.addEventListener('click', closeImagePopup);

const editPopup = document.querySelector('#edit-popup');
editPopup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup();
    }
});

const addCardPopup = document.querySelector('#add-popup');
addCardPopup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
        closeAddPopup();
    }
});

const imageCardPopup = document.querySelector('#image-popup');
imageCardPopup.addEventListener('click', function(evt) {
    if (evt.target === evt.currentTarget) {
        closeImagePopup();
    }
});

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closePopup();
      closeAddPopup();
      closeImagePopup();
    }
  });

