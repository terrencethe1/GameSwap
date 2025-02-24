import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveGameIds, getSavedGameIds } from '../utils/localStorage';
import type { Game } from '../models/Game';

import { GAME_SWAP_LIBRARY } from '../utils/queries';
import { SAVE_GAME } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

const SearchLibrary = () => {
  // Query to retrieve saved user data
  const { loading, data, refetch } = useQuery(GAME_SWAP_LIBRARY);

  const getLibrary = refetch();

  const libraryData = data;

  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState<Game[]>([]);

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved game _id values
  const [savedBookIds, setSavedBookIds] = useState(getSavedGameIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    const getLibraryData = async () => {
      try {
        await getLibrary;
        
        console.log(libraryData);
    
        if (!loading) {
          setSearchedBooks(libraryData.gameSwapLibrary);
        };

      } catch (err) {
        console.error(err);
      }
    };
    getLibraryData();
    return () => saveGameIds(savedBookIds);
  }, [data]);

  const [saveGame, { error }] = useMutation(SAVE_GAME);

  // create method to search for games and set state on form submit
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await libraryData;

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const gameData = items.map((game: Game) => ({
        _id: game._id,
        publisher: game.publisher,
        title: game.title,
        released: game.released,
        description: game.description,
        image: game.image || '',
        available: game.available
      }));

      setSearchedBooks(gameData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a game to our user profile
  const handleSaveGame = async (_id: string) => {
    // find the game in `searchedBooks` state by the matching _id
    const gameToSave: Game = searchedBooks.find((book) => book._id === _id)!;

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveGame({ variables: gameToSave });

      if (error) {
        throw new Error('something went wrong!');
      };

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, gameToSave._id]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {searchedBooks.map((game) => {
            return (
              <Col md="4" key={game.title}>
                <Card border='dark'>
                  {game.image ? (
                    <Card.Img src={game.image} alt={`The cover for ${game.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game.title}</Card.Title>
                    <p className='small'>Publisher: {game.publisher}</p>
                    <Card.Text>{game.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId: string) => savedBookId === game._id)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveGame(game._id)}>
                        {savedBookIds?.some((savedBookId: string) => savedBookId === game._id)
                          ? 'This game has already been saved!'
                          : 'Save this Game!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchLibrary;
