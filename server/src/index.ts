import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import cors from "cors";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { getDecksController } from "./controllers/getDecksController";

mongoose.set('strictQuery', false);
config();
const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/decks', getDecksController);

app.post('/decks', createDeckController);

app.delete('/decks/:deckId', deleteDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
	console.log(`listening on port ${PORT}`);
	app.listen(PORT);
});