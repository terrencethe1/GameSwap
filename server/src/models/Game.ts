import { Schema, model, type Document } from 'mongoose';

export interface GameDocument extends Document {
  title: string;
  publisher: string;
  released: string;
  description: string;
  image: string;
  available: boolean;
}

// This is a subdocument schema. It will be used as the schema for the User's `savedGames` array in User.js.
const gameSchema = new Schema<GameDocument>({
  publisher: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  released: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
});


// This is the GameSwap GameLibrary model.
const LibraryGame = model<GameDocument>('LibraryGame', gameSchema);

export { gameSchema, LibraryGame };
