import db from '../config/connection.js';
import { LibraryGame } from '../models/index.js'
import cleanDB from './cleanDb.js';

import gameSwapLibraryData from './gameSwapLibrary.json' with { type: 'json'};

try {
  await db;
  await cleanDB();

  // bulk create each model
  await LibraryGame.insertMany(gameSwapLibraryData);

  console.log('Seeding completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
