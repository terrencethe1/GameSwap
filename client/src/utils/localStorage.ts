export const getSavedGameIds = () => {
  const savedGameIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games')!)
    : [];

  return savedGameIds;
};

export const saveGameIds = (gameIdArr: string[]) => {
  if (gameIdArr.length) {
    localStorage.setItem('saved_games', JSON.stringify(gameIdArr));
  } else {
    localStorage.removeItem('saved_games');
  }
};

export const removeGameId = (gameId: string) => {
  const savedGameIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games')!)
    : null;

  if (!savedGameIds) {
    return false;
  }

  const updatedSavedGameIds = savedGameIds?.filter((savedBookId: string) => savedBookId !== gameId);
  localStorage.setItem('saved_games', JSON.stringify(updatedSavedGameIds));

  return true;
};
