function Card({card, onCardClick}) {
  
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card">
      <div className = "card__image-background">
        <img src={card.link} alt={card.name} className="card__image" onClick={handleClick}/>
      </div>
      <button type="button" aria-label="Удалить" className="card__delete-button"></button>
      <div className="card__rectangle">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__like-element">
          <button type="button" aria-label="Лайк" className="card__like-button"></button>
          <div className="card__counter">{card.likes.length}</div>
        </div>
      </div>
    </li>
  )
}

export default Card;