import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import Deck from "./models/Deck";

mongoose.set('strictQuery', false);
config();
const app = express();

const PORT = 5000;

app.use(express.json());

app.post('/decks', async (req: Request, res: Response) => {
	console.log(req.body)
	const newDeck = new Deck({
		title: req.body.title
	});
	const createdDeck = await newDeck.save();
	res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`listening on port ${PORT}`);
	app.listen(PORT);
});