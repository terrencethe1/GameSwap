const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedGames: [Game]
        bookCount: Int
    }

    type Game {
        _id: ID
        publisher: String
        description: String
        image: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveGame(publisher: String, description: String!, image: String, title: String!): [Game]
        removeGame(_id: ID!): [Game]
    }
`;

export default typeDefs;