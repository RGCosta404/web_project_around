
const formElement = document.querySelector('.popup__form');
const editButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('#edit-popup');

const profileName = document.querySelector('.profile__name');
const profileRole = document.querySelector('.profile__role');

const nameInput = document.querySelector('.popup__input[name="name"]');
const roleInput = document.querySelector('.popup__input[name="role"]');

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
