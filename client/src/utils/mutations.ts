import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    user {
      username
      email
      _id
    }
    token
  }
}
`;

export const ADD_USER = gql `
mutation AddUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      username
      email
      _id
    }
    token
  }
}
`;

export const REMOVE_GAME = gql `
mutation RemoveGame($_id: ID!) {
  removeGame(_id: $_id) {
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
`;

export const SAVE_GAME = gql `
mutation SaveGame($_id: ID!) {
  saveGame(_id: $_id) {
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
`;