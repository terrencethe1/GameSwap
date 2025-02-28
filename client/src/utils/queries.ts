import { gql } from '@apollo/client';

export const GET_ME = gql `
query GetMe {
  me {
    _id
    username
    email
    gameCount
    savedGames {
      _id {
        _id
        available
        description
        image
        publisher
        released
        title
      }
      returnDate
    }
  }
}
`;

export const GAME_SWAP_LIBRARY = gql `
query GameSwapLibrary {
  gameSwapLibrary {
    _id
    available
    description
    image
    publisher
    released
    title
  }
}
`;
export const SEARCH_GAME = gql `
query SearchGame ($title: String!) {
  searchGame (title: $title) {
    _id
    available
    description
    image
    publisher
    released
    title
  }
}
`;

export const SEARCH_BAR = gql `
query SearchBar($title: String!) {
  searchBar(title: $title) {
    _id
    publisher
    released
    description
    image
    title
    available
  }
}
`;