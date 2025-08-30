
let formElement = document.querySelector('.pop-up__form');
let editButton = document.querySelector('.profile__edit');
let closeButton = document.querySelector('.pop-up__close');
let popup = document.querySelector('#edit-pop-up');

let profileName = document.querySelector('.profile__name');
let profileRole = document.querySelector('.profile__role');

let nameInput = document.querySelector('.pop-up__input[name="name"]');
let roleInput = document.querySelector('.pop-up__input[name="role"]');

function handleProfileFormSubmit(evt) {
    
    evt.preventDefault();
 
    let nameInput = document.querySelector('#name-input');
    let roleInput = document.querySelector('#role-input');

   let nameValue = nameInput.value;
   let roleValue = roleInput.value;

   let nameDisplayElement = document.querySelector('.profile__name');
   let roleDisplayElement = document.querySelector('.profile__role');

    nameDisplayElement.textContent = namevalue;
    roleDisplayElement.textContent = rolevalue;
}


formElement.addEventListener('submit', handleProfileFormSubmit);