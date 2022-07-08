import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Card from "./Card";

function Main({isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUsersInfo(), api.getCards()])
      .then(([user, cardInfo]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(cardInfo);
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      })
  }, [])


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-cover" onClick={isEditAvatarPopupOpen}>
          <img src={userAvatar} alt="Изображение загружается" className="profile__avatar"/>
        </div>
        <div className="profile__info">
        <div className="profile__text">
          <h1 className="profile__user-name">{userName}</h1>
          <p className="profile__user-activity">{userDescription}</p>
        </div>
        <button type="button" aria-label="Редактировать" className="profile__edit-button" onClick={isEditProfilePopupOpen}></button>
        </div>
        <button type="button" aria-label="Добавить" className="profile__add-button" onClick={isAddPlacePopupOpen}></button> 
      </section>

      <section className="elements">
        <ul className="elements__container">
          {cards.map((card) => {
            return (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
            />)
            })
          }
        </ul>
      </section>
      
      

    </main>
  )
}

export default Main;