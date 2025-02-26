import { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeGameId } from '../utils/localStorage';
import type { User } from '../models/User';

import { useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_GAME } from '../utils/mutations';

const SavedGames = () => {
  const [userData, setUserData] = useState<User>({
    username: '',
    email: '',
    password: '',
    savedGames: [],
  });

  // Query to retrieve saved user data
  const { loading, data, error, refetch } = useQuery(GET_ME);

  const getMe = refetch();

  const userProfileData = data;
  
  // Mutation to delete a game from the user's favorites
  const [removeGame] = useMutation(REMOVE_GAME);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        await getMe;

        if (error) {
          throw new Error('something went wrong!');
        };

        // if (loading) {
        //   console.log("Loading:", loading);
        // } else {
        //   console.log("getUserData:", userProfileData);
        // };
        
        if (!loading) {
          const user: User = {
            username: userProfileData.me.username,
            email: userProfileData.me.email,
            password: '',
            savedGames: userProfileData.me.savedGames,
          };
          setUserData(user);
        };

      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [data]);

  // create function that accepts the game's mongo _id value as param and deletes the game from the database
  const handleDeleteGame = async (_id: string, title: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      await removeGame({ variables: { _id } });

      if (error) {
        throw new Error('something went wrong!');
      };

      // upon success, remove game's id from localStorage
      removeGameId(title);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved games!</h1>
          ) : (
            <h1>Viewing saved games!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${
                userData.savedGames.length === 1 ? 'game' : 'games'
              }:`
            : 'You have no saved games!'}
        </h2>
        <Row>
          {userData.savedGames.map((game) => {
            return (
              <Col md='4'>
                <Card key={game._id.title} border='dark'>
                  {game._id.image ? (
                    <Card.Img
                      src={game._id.image}
                      alt={`The cover for ${game._id.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{game._id.title}</Card.Title>
                    <p className='small'>Released: {game._id.released}</p>
                    <p className='small'>Publisher: {game._id.publisher}</p>
                    <Card.Text>{game._id.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteGame(game._id._id, game._id.title)}
                    >
                      Return this Game!
                    </Button>
                    <p id='due-date'> <b>Return Date: {game.returnDate}</b> </p>
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

export default SavedGames;
