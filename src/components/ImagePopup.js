function ImagePopup({onClose, isOpen, card}) {

  function closePopupOnOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={isOpen 
      ? "popup popup_type_view-image popup_opened"
      : "popup popup_type_view-image"}
      onMouseDown={closePopupOnOverlay}
    >
      <div className="popup__image-container">
        <img src={card.link} alt={card.name} className="popup__image"/>
        <h2 className="popup__image-title">{card.name}</h2>
       <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>  
  )
}

export default ImagePopup;