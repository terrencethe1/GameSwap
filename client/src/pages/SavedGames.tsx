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

  // useState to determine if the game description should display
  const [displayDescription, setDisplayDescription] = useState<string>(); 

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
      // Execute the removeGame mutation with input variables of _id
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
      <div className='text-light bg-dark p-4 bgcolor'>
        <Container>
          {userData.username ? (
            <h1 className='center orbitron'>{userData.username}'s saved games!</h1>
          ) : (
            <h1 className='orbitron'>Viewing saved games!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='text-light pt-5 orbitron' >
          {userData.savedGames.length
            ? `Viewing ${userData.savedGames.length} saved ${
                userData.savedGames.length === 1 ? 'game' : 'games'
              }:`
            : 'You have no saved games!'}
        </h2>
        <Row>
          {userData.savedGames.map((game) => {
            return (
              <Col key={game._id.title} md='4'>
                <Card border='dark' className='margin'>
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
                    <span className='due-date'>
                      <p className='small'>Publisher: {game._id.publisher}</p>
                      <p> <b>Due Date:</b> {game.returnDate} </p>
                    </span>
                    {displayDescription === game._id.title? <Card.Text>{game._id.description}</Card.Text> : <></>}
                    <span className='control-buttons'>
                      <Button 
                        onClick={() => {
                          if (displayDescription !== game._id.title) {
                            setDisplayDescription(game._id.title)
                          } else {
                            setDisplayDescription('')
                          }
                        }}>
                        Toggle Description
                      </Button>
                      <Button
                        className='btn-block btn-danger'
                        onClick={() => handleDeleteGame(game._id._id, game._id.title)}>
                        Return this Game!
                      </Button>
                    </span>
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
