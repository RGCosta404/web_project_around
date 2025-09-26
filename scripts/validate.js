function enableValidation(config) {
  const forms = Array.from(document.querySelectorAll(config.formSelector)); 
  
  forms.forEach((form) => {
    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (isFormValid(inputs)) {
      }
    });

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
        const formElement = input.closest(config.formSelector);
    
        if (isInputValid(input)) {
            hideInputError(formElement, input, config);
        } else {
        const errorMessage = input.validationMessage;
        showInputError(formElement, input, errorMessage, config);
        }
        toggleSubmitButtonState(inputs, submitButton, config);
    });
    });
  });
}

function isInputValid(input) {
  return input.validity.valid;
}

function isFormValid(inputs) {
  return inputs.every(isInputValid);
}
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

function toggleSubmitButtonState(inputs, button, config) {
  if (isFormValid(inputs)) {
    button.classList.remove(config.inactiveButtonClass);
  } else {
    button.classList.add(config.inactiveButtonClass);
  }
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
});
