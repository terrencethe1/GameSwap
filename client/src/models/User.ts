import type { Game } from './Game.js';

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
  savedGames: Game[];
}
