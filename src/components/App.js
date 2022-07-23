import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { api } from "../utils/api";
import { useEffect, useState } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);




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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLike(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id))
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleUpdateUser(user) {
    api.setUsersInfo(user) 
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
    })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleUpdateAvatar(user) {
    api.setUserAvatar(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
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

  useEffect(() => {
    Promise.all([api.getUsersInfo(), api.getCards()])
      .then(([user, cardInfo]) => {
        setCurrentUser(user);
        setCards(cardInfo);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }, [])

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">

      <Header/>

      <Main
        isEditProfilePopupOpen={handleEditProfileClick}
        isAddPlacePopupOpen={handleAddPlaceClick}
        isEditAvatarPopupOpen={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards={cards}
      />

      <Footer/>

      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={closePopupOnOverlay}
        onUpdateUser={handleUpdateUser} 
      /> 

      < AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={closePopupOnOverlay}
        onAddPlace={handleAddPlaceSubmit}
      />

      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={closePopupOnOverlay}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <ImagePopup
        onClose={closeAllPopups}
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onOverlayClose={closePopupOnOverlay}
      />

    </div>
  </CurrentUserContext.Provider>
  );
  }

export default App;
