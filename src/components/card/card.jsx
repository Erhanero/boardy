const Card = ({id, title, description, label, onClick}) => {
	return (
		<div className="card" onClick={() => onClick({id, title, description, label})}>
			<h3 className="card__title">{title}</h3>

			<p className="card__description">{description} </p>

			{label && <span className="card__label">{label}</span>}
		</div>	
	)
}

export default Card;