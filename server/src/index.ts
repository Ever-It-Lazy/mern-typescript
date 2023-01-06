import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import Deck from "./models/Deck";

mongoose.set('strictQuery', false);
config();
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/decks', async (req: Request, res: Response) => {
	const decks = await Deck.find();
	res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
	const newDeck = new Deck({
		title: req.body.title
	});
	const createdDeck = await newDeck.save();
	res.json(createdDeck);
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
	const deckId = req.params.deckId;

	const deck = await Deck.findByIdAndDelete(deckId);

	res.json({
		message: "successfully deleted the entry"
	});
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`listening on port ${PORT}`);
	app.listen(PORT);
});