import { Schema, model, type Document } from 'mongoose';

// import schema from Game.js
import gameSchema from './Game.js';
import type { GameDocument } from './Game.js';

export interface SwapCatalogueDocument extends Document {
    allGames: GameDocument[];
    availableGames: GameDocument[];
    swappedGames: GameDocument[];
};

const swapCatalogueSchema = new Schema<SwapCatalogueDocument> (
    {
        allGames: [gameSchema],
        availableGames: [gameSchema],
        swappedGames: [gameSchema]
    },
    // set this to use virtual below
    {
        toJSON: {
        virtuals: true,
        },
    }
);

const SwapCatalogue = model<SwapCatalogueDocument>('SwapCatalogue', swapCatalogueSchema);

export default SwapCatalogue;