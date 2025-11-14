class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleDeleteConfirmation,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteConfirmation = handleDeleteConfirmation;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".elements__like")
      .addEventListener("click", () => {
        this._handleLikeButtonClick();
      });

    this._element
      .querySelector(".elements__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleImageClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._setEventListeners();

    this._element.querySelector(".elements__image").src = this._link;
    this._element.querySelector(".elements__image").alt = this._name;
    this._element.querySelector(".elements__place").textContent = this._name;

    if (this._isLiked) {
      this._element
        .querySelector(".elements__like")
        .classList.add("elements__like-active");
    }

    return this._element;
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this._id, this._isLiked);

    this._element
      .querySelector(".elements__like")
      .classList.toggle("elements__like-active");

    this._isLiked = !this._isLiked;
  }

  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }

  _handleDeleteClick() {
    this._handleDeleteConfirmation(this._id, this._element);
  }
}

export default Card;
