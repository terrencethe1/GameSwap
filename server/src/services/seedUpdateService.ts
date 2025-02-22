import fs from 'node:fs/promises';

class SearchResults {
  title: string;
  publisher: string;
  released: string;
  description: string;
  image: string;
  available: boolean;

  constructor(title: string, publisher: string, released: string, description: string, image: string, available: boolean) {
    this.title = title;
    this.publisher = publisher;
    this.released = released;
    this.description = description;
    this.image = image;
    this.available = available;
  }
}

class SeedUpdateService {
  // Define a read method that reads from the gameSwapLibrary.json file
  private async read() {
    return await fs.readFile('src/seeds/gameSwapLibrary.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }

  // Define a write method that writes the updated libraryGames array to the gameSwapLibrary.json file
  private async write(libraryGames: SearchResults[]) {
    return await fs.writeFile('src/seeds/gameSwapLibrary.json', JSON.stringify(libraryGames, null, '\t'));
  }

  // Define a getSearchResults method that reads the libraryGames from the gameSwapLibrary.json file and returns them as an array of SearchResults objects
  async getSearchResults() {
    return await this.read().then((libraryGames) => {
      let parsedSearchResults: SearchResults[];

      // If libraryGames isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedSearchResults = [].concat(JSON.parse(libraryGames));
      } catch (err) {
        parsedSearchResults = [];
      }

      return parsedSearchResults;
    });
  }

  // Define an addSearchResults method that adds a game to the gameSwapLibrary.json file
  async addSearchResults(gameName: string, gamePublisher: string, gameReleased: string, gameDescription: string, gameImage: string, gameAvailable: boolean) {
    if (!gameName) {
      throw new Error('game cannot be blank');
    }

    const newSearchResults: SearchResults = { title: gameName, publisher: gamePublisher, released: gameReleased, description: gameDescription, image: gameImage, available: gameAvailable };

    // Get all libraryGames, add the new game, write all the updated libraryGames, and then return the newSearchResults.
    return await this.getSearchResults()
      .then((libraryGames) => {
        if (libraryGames.find((index) => index.title === gameName)) {
          return libraryGames;
        }
        return [...libraryGames, newSearchResults];
      })
      .then((updatedSearchResults) => this.write(updatedSearchResults))
      .then(() => newSearchResults);
  }
}

export default new SeedUpdateService();
