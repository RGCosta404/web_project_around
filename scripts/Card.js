class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector) 
        .content
        .querySelector('.elements__card')
        .cloneNode(true);  

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._handleDeleteClick();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleImageClick();
        });
    }

    generateCard() {
        this._element = this._getTemplate();

        this._setEventListeners();

        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;
        this._element.querySelector('.elements__place').textContent = this._name;

        return this._element;
    }

    _handleLikeClick() {
        this._element.querySelector('.elements__like').classList.toggle('elements__like-active');
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    _handleImageClick() {
        const imagePopup = document.querySelector('#image-popup');
        const imagePopupImage = imagePopup.querySelector('.popup__image');
        const imagePopupCaption = imagePopup.querySelector('.popup__caption');

        imagePopupImage.src = this._link;
        imagePopupImage.alt = this._name;
        imagePopupCaption.textContent = this._name;

        imagePopup.style.display = 'flex';
    }
}

export default Card;
