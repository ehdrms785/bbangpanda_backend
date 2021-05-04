require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express, { json, response, urlencoded } from "express";
import { resolvers, typeDefs } from "./schema";
import logger from "morgan";
import http from "http";
import client from "./client";
import { getUser } from "./users/users.utils";

import "./firebase/firebase_admin";

const PORT = process.env.PORT;

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    let authorization = "";
    if (req) {
      authorization = req.headers.authorization || "";
      // console.log(authorization);
      // console.log("접속시도 끝");
    } else {
      authorization = connection?.context.authorization || "";
    }

    return {
      loggedInUser: await getUser(authorization),
      client,
      token: authorization,
    };
  },
  subscriptions: {
    onConnect: async ({ Authorization }: { Authorization?: string }) => {
      if (!Authorization) {
        throw new Error("You can't listening");
      }
      return {
        authorization: Authorization,
      };
    },
  },
});

const app = express();
app.use(logger("tiny"));
app.use(express.json());
app.use(urlencoded({ extended: true }));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});

module.exports = apollo;
