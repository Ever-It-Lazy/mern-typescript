import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TDeck } from './api/getDecks';
import { createCard } from './api/createCard';
import { getDeck } from './api/getDeck';
import { deleteCard } from './api/deleteCard';
import "./Deck.css";

function Deck() {
	const [deck, setDeck] = useState<TDeck | undefined>();
	const [cards, setCards] = useState<string[]>([]);
	const [text, setText] = useState("");
	let { deckId } = useParams();


	const handleCreateDeck = async (e: React.FormEvent) => {
		e.preventDefault();
		const {cards} = await createCard(deckId!, text);
		setCards(cards);
		setText("");
	};

	const handleDeleteCard = async (index: number) => {
		if (!deckId) return;

		const newDeck = await deleteCard(deckId, index);
		setDeck(newDeck);
		setCards(newDeck.cards);
	};

	useEffect(() => {
		(async () => {
			if (!deckId) return;

			const newDeck = await getDeck(deckId);
			setDeck(newDeck);
			setCards(newDeck.cards);
		})();
	}, [deckId]);

	return (
		<div className="Deck">
			<ul className='cards'>
				{cards.map((card, index) => (
					<li key={card}>
						<button onClick={() => handleDeleteCard(index)}>X</button>
						{card}
					</li>
				))}
			</ul>
			<form onSubmit={handleCreateDeck}>
				<label htmlFor="card-text">Card Text</label>
				<input
					id="card-text"
					value={text}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setText(e.target.value);
					}}
				/>
				<button>Create Card</button>
			</form>
		</div>
	)
}

export default Deck
