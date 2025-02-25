import { Schema, Document, Date } from 'mongoose';
import { LibraryGame } from "./Game.js";

export interface RentalGameDocument extends Document {
    _id: Schema.Types.ObjectId;
    returnDate: Date;
}

const rentalGameSchema = new Schema<RentalGameDocument>({
    _id: {
        type: Schema.Types.ObjectId,
        ref: LibraryGame
    },
    returnDate: {
        type: String,
        default: '2025-02-28'
    }
});

export { rentalGameSchema };