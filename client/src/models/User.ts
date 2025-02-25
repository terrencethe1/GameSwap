// import type { Game } from './Game.js';
import { RentalGame } from './RentalGame.js';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedGames: RentalGame[];
}
