function openPopup(popup) {
  popup.style.display = 'flex';
}

  
function closePopup(popup) {
  popup.style.display = 'none';
}


function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openPopup = document.querySelector('.popup[style*="display: flex"]');
        if (openPopup) {
            closePopup(openPopup);
        }
    }
}


export { openPopup, closePopup, closeByEscape };