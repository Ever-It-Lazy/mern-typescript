import { API_URL } from "./config";
import { TDeck } from "./getDecks";

export async function deleteDeck(deckId: string): Promise<TDeck> {
	const response = await fetch(`${API_URL}/decks/${deckId}`, {
		method: 'DELETE'
	});

	return response.json();
}