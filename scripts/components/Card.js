class Card {
  constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
        this._handleCardClick(this._name, this._link);
    }
}

export default Card;
