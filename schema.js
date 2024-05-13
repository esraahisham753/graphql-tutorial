export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platforms: [String!]!
        reviews: [Review!]
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        content: String!
        rating: String!
        game: Game!
        author: Author!
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        authors: [Author]
        author(id: ID!): Author
        games: [Game]
        game(id: ID!): Game
    }

    type Mutation {
        deleteGame(id: ID!): [Game]
    }

    
`;
