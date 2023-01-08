import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { createDeck } from './api/createDeck';
import { getDecks, TDeck } from './api/getDecks';

function App() {
	const [decks, setDecks] = useState<TDeck[]>([]);
	const [title, setTitle] = useState("");

	const handleCreateDeck = async (e: React.FormEvent) => {
		e.preventDefault();
		const deck = await createDeck(title);
		setDecks([...decks, deck]);
		setTitle("");
	};

	const handleDeleteDeck = async (deckId: string) => {
		await deleteDeck(deckId);
		setDecks(decks.filter((deck) => deck._id !== deckId));
	};

	useEffect(() => {
		(async () => {
			const newDecks = await getDecks();
			setDecks(newDecks);
		})();
	}, []);

	return (
		<div className="App">
			<ul className='decks'>
				{decks.map((deck) => (
					<li key={deck._id}>
						<button onClick={() => handleDeleteDeck(deck._id)}>X</button>
						<Link to={`decks/${deck._id}`}>{deck.title}</Link>
					</li>
				))}
			</ul>
			<form onSubmit={handleCreateDeck}>
				<label htmlFor="deck-title">Deck Title</label>
				<input
					id="deck-title"
					value={title}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						setTitle(e.target.value);
					}}
				/>
				<button>Create Deck</button>
			</form>
		</div>
	)
}

export default App
