import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
    handleImagePopupClick();
  }


  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleImagePopupClick() {
    setIsImagePopupOpen(true);
  }

  function closePopupOnOverlay(evt) {
    if(evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  useEffect(() => {
    if(isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen) {
      function handleEscClose(evt) {
        if(evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEscClose);
      return () => { 
        document.removeEventListener('keydown', handleEscClose); 
      }
    }
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen]);

  return (
  <div className="page">
    <Header/>

    <Main
      isEditProfilePopupOpen={handleEditProfileClick}
      isAddPlacePopupOpen={handleAddPlaceClick}
      isEditAvatarPopupOpen={handleEditAvatarClick}
      onCardClick={handleCardClick}
    />

    <Footer/>

    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonName="Сохранить"
      isOpen={isEditProfilePopupOpen}
      onClose={closeAllPopups}
      onOverlayClose={closePopupOnOverlay}
    >
      <input 
        required 
        minLength="2"
        maxLength="40"
        type="text" 
        name="name" 
        id="name-input"
        className="popup__input popup__input_type_name" 
        placeholder="Имя"
      />
      <span className="popup__error popup__error_visible" id="name-input-error"></span>
      <input 
        required
        minLength="2"
        maxLength="200"
        type="text" 
        name="about" 
        id="activity-input"
        className="popup__input popup__input_type_activity" 
        placeholder="Профессия"
      />
      <span className="popup__error popup__error_visible" id="activity-input-error"></span>
    </PopupWithForm>

    <PopupWithForm
      name="popup_type_add-card"
      title="Новое место"
      buttonName="Создать"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onOverlayClose={closePopupOnOverlay}
    >
      <input 
        required
        minLength="2"
        maxLength="30"
        type="text" 
        name="name"
        id="place-input" 
        className="popup__input popup__input_type_place" 
        placeholder="Название"
      />
      <span className="popup__error popup__error_visible" id="place-input-error"></span>
      <input 
        required 
        type="url" 
        name="link" 
        id="link-input"
        className="popup__input popup__input_type_link" 
        placeholder="Ссылка на картинку"
      />
      <span className="popup__error popup__error_visible" id="link-input-error"></span>
    </PopupWithForm>

    <PopupWithForm
      name="popup_type_edite-avatar"
      title="Обновить аватар"
      buttonName="Сохранить"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onOverlayClose={closePopupOnOverlay}
    >
      <input 
        required 
        type="url" 
        name="avatar" 
        id="image-link-input"
        className="popup__input popup__input_type_link" 
        placeholder="Ссылка на картинку"
      />
      <span className="popup__error popup__error_visible" id="image-link-input-error"></span>
    </PopupWithForm>

    <ImagePopup
      onClose={closeAllPopups}
      card={selectedCard}
      isOpen={isImagePopupOpen}
      onOverlayClose={closePopupOnOverlay}
    />

  </div>
  );
}

export default App;
