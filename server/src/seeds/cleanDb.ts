import { LibraryGame } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
  try {
    await LibraryGame.deleteMany({});
    console.log('GameSwap library collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;
