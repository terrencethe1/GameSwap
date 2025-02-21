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

export const REMOVE_BOOK = gql `
mutation RemoveBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    title
    image
    description
    bookId
    authors
  }
}
`;

export const SAVE_BOOK = gql `
mutation SaveBook($authors: [String], $image: String, $title: String!, $bookId: String!, $description: String!) {
  saveBook(authors: $authors, image: $image, title: $title, bookId: $bookId, description: $description) {
    authors
    bookId
    description
    image
    title
  }
}
`;