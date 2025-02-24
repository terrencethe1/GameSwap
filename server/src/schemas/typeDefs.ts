const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedGames: [Game]
        gameCount: Int
    }

    type Game {
        _id: ID
        publisher: String
        released: String
        description: String
        image: String
        title: String
        available: Boolean
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        gameSwapLibrary: [Game]
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveGame(_id: ID!): [Game]
        removeGame(_id: ID!): [Game]
    }
`;

export default typeDefs;