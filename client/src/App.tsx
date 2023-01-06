import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

type TDeck = {
	title: string;
	_id: string;
}

function App() {
	const [decks, setDecks] = useState<TDeck[]>([]);
	const [title, setTitle] = useState("");

	const handleCreateDeck = async (e: React.FormEvent) => {
		e.preventDefault();
		const deck = await fetch('http://localhost:5000/decks', {
			method: 'POST',
			body: JSON.stringify({
				title,
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((res) => res.json());
		setDecks([...decks, deck]);
		setTitle("");
	};

	const handleDeleteDeck = async (deckId: string) => {
		await fetch(`http://localhost:5000/decks/${deckId}`, {
			method: 'DELETE'
		});
		setDecks(decks.filter((deck) => deck._id !== deckId));
	};

	useEffect(() => {
		(async () => {
			const newDecks = await fetch('http://localhost:5000/decks')
				.then((res) => res.json());
			setDecks(newDecks);
		})();
	}, []);


	return (
		<div className="App">
			<ul className='decks'>
				{decks.map((deck) => (
					<li key={deck._id}>
						<button onClick={() => handleDeleteDeck(deck._id)}>X</button>
						{deck.title}
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
