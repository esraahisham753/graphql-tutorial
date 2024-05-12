export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platforms: [String!]!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
    }

    type Review {
        id: ID!
        content: String!
        rating: String!
    }

    type Query {
        reviews: [Review]
        authors: [Author]
        games: [Game]
    }
`;
