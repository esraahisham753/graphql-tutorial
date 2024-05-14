import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find(game => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find(author => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find(review => review.id === args.id);
    }
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter(review => review.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter(review => review.author_id === parent.id)
    }
  },
  Review: {
    game(parent) {
      return db.games.find(game => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find(author => author.id === parent.author_id);
    }
  },
  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter(game => game.id !== args.id);

      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString()
      }

      db.games.push(game);

      return game;
    },
    updateGame(_, args) {
      db.games = db.games.map((game) => {
        if (game.id === args.id) {
          return {...game, ...args.gameEdit};
        }
        else {
          return game
        }
      });

      return db.games.find(game => game.id === args.id);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log("Server listening at port", 4000);
