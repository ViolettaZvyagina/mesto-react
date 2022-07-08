function PopupWithForm({name, title, children, buttonName, isOpen, onClose}) {

      function closePopupOnOverlay(evt) {
        if(evt.target === evt.currentTarget) {
          onClose();
        }
      }


  return (
    <div className={isOpen
      ? `popup popup_type_${name} popup_opened`
      : `popup popup_type_${name}`} 
      onMouseDown={closePopupOnOverlay}>
      <div className="popup__container">
        <form action="#" name={name} className="popup__form" noValidate>
          <h2 className="popup__title">{title}</h2>
           {children}
           <button type="submit" aria-label="Сохранить" className="popup__submit-button">{buttonName}</button>
        </form>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
        </div>     
    </div>
  )
}

export default PopupWithForm;