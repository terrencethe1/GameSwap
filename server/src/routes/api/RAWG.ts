import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// GET /games - Get all games from RAWG
router.get('/allGames', async (_req: Request, res: Response) => {
  try {
    console.log(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
    const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // Express returns the "data" on the "res" object
    res.status(200).send(data);
  } catch (err) {
    console.log('an error occurred', err);
    res.json();
  }
});

// GET /gamesByName/:name - Get games from RAWG by name or game_id number
router.get('/gamesByName/:name', async (req: Request, res: Response) => {
  try {
    const cleanName: string = encodeURIComponent(req.params.name);
    console.log(`https://api.rawg.io/api/games?search=${cleanName}&search_exact=true&key=${process.env.RAWG_API_KEY}`);
    const response = await fetch(`https://api.rawg.io/api/games?search=${cleanName}&search_exact=true&key=${process.env.RAWG_API_KEY}`);
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // Express returns the "data" on the "res" object
    res.status(200).send(data);
  } catch (err) {
    console.log('an error occurred', err);
    res.json();
  }
});

// GET /gameInfoSlug/:slug - Get game info based on game slug
router.get('/gameInfoSlug/:slug', async (req: Request, res: Response) => {
  try {
    console.log(`https://api.rawg.io/api/games/${req.params.slug}?key=${process.env.RAWG_API_KEY}`);
    const response = await fetch(`https://api.rawg.io/api/games/${req.params.slug}?key=${process.env.RAWG_API_KEY}`);
    // console.log('Response:', response);
    const data = await response.json();
    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    }
    // Express returns the "data" on the "res" object
    res.status(200).send(data);
  } catch (err) {
    console.log('an error occurred', err);
    res.json();
  }
});


export { router as rawgRouter };
