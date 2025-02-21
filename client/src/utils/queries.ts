import { gql } from '@apollo/client';

export const GET_ME = gql `
query GetMe {
  me {
    username
    email
    savedBooks {
      title
      image
      description
      bookId
      authors
    }
  }
}
`;