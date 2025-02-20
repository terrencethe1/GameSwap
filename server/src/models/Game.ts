import { Schema, type Document } from 'mongoose';

export interface GameDocument extends Document {
  title: string;
  publisher: string;
  description: string;
  image: string;
}

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
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
});

export default gameSchema;
