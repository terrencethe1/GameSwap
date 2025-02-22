import express, { Request, Response } from 'express';
import fs from 'node:fs/promises';
import seedUpdateService from '../../services/seedUpdateService.js';

interface SearchResults {
  slug: string;
  name: string;
}

interface GameSwapType {
  title: string;
  publisher: string;
  released: string;
  description: string;
  image: string;
  available: boolean;
}

// Clean the response data from RAWG searches to only include the name and slug for each game.
const dataCleaner = async (data: any): Promise<SearchResults[]> => {
  let cleanData: SearchResults[] = data.results.map(
    (result: any) => {
      return { slug: result.slug, name: result.name }
    }
  );

  if (data.next) {
    let nextPage = data.next;
    // Grab results from the first 10 pages of the search results.
    for (let page = 0; page < 10; page++) {
      let response1 = await fetch(nextPage);
      let data1 = await response1.json();
      let cleanData1: SearchResults[] = data1.results.map(
        (result: any) => {
          return { slug: result.slug, name: result.name }
        }
      );
      cleanData = cleanData.concat(cleanData1);
      // Break out of the loop if there is no next page.
      if (!data1.next) {break};
      nextPage = data1.next;
    };
  };

  return cleanData;
};

// Clean the response data from a RAWG slug search to only include data compliant with the GameSwapType interface.
const slugDataCleaner = (data: any): GameSwapType => {
  const cleanData: GameSwapType = {
    title: data.name,
    publisher: data.publishers[0].name,
    released: data.released,
    image: data.background_image,
    description: data.description,
    available: true
  };
  return cleanData;
};

const writeSearchHistory = async (cleanData: SearchResults[]) => {
  return await fs.writeFile('src/seeds/searchHistory.json', JSON.stringify(cleanData, null, '\t'));
};

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
    };

    const cleanData = await dataCleaner(data);

    // Express returns the "data" on the "res" object
    res.status(200).send(cleanData);
  } catch (err) {
    console.log('an error occurred', err);
    res.json();
  }
});

// GET /gamesByName/:name - Search for game information from RAWG by name or game_id number
router.get('/gamesByName/:name', async (req: Request, res: Response) => {
  try {
    const cleanName: string = encodeURIComponent(req.params.name);
    console.log(`https://api.rawg.io/api/games?search=${cleanName}&search_exact=true&key=${process.env.RAWG_API_KEY}`);
    const response = await fetch(`https://api.rawg.io/api/games?search=${cleanName}&search_exact=true&key=${process.env.RAWG_API_KEY}`);

    // console.log('Response:', response);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('invalid API response, check the network tab');
    };

    const cleanData = await dataCleaner(data);

    console.log(cleanData);

    await writeSearchHistory(cleanData);

    // Express returns the "cleanData" on the "res" object
    res.status(200).send(cleanData);
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
    };

    const cleanData: GameSwapType = slugDataCleaner(data);

    console.log(cleanData);

    // Update the gameSwapLibrary.json file with the new data.
    await seedUpdateService.addSearchResults(cleanData.title, cleanData.publisher, cleanData.released, cleanData.description, cleanData.image, cleanData.available);

    // Express returns the "cleanData" on the "res" object
    res.status(200).send(cleanData);
  } catch (err) {
    console.log('an error occurred', err);
    res.json();
  }
});


export { router as rawgRouter };
