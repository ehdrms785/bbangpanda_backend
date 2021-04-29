require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express, { json, response } from "express";
import { resolvers, typeDefs } from "./schema";
import logger from "morgan";
import http from "http";
import client from "./client";
import { getUser, protectResolver } from "./users/users.utils";
import bodyParser, { urlencoded } from "body-parser";
import "./firebase/firebase_admin";
const kakao_auth = require("./kakao_auth.ts");
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
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
apollo.applyMiddleware({ app });
app.get("/callbacks/kakao/sign_in", async (req, res) => {
  const redirect = `webauthcallback://success?${new URLSearchParams(
    req.query as any
  ).toString()}`;
  console.log(`Redirecting to ${redirect}`);
  res.redirect(307, redirect);
});
app.post("/callbacks/kakao/token", async (req, res) => {
  // if(req.statusCode )
  // console.log(req);
  console.log("토큰페이지");
  // console.log(req.body);
  // kakao_auth.createFirebaseToken(req.body["accessToken"], (result: any) => {
  // //   // console.log(result);
  //   res.send(result);
  // });
});
app.post("/callbacks/bbangnarae/sign_in", async (req, res) => {
  console.log("신호받았다");
});

// app.post("/callbacks/kakao/unconnect", (req, res) => {});

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`Server is running on http:localhost:${PORT}`);
});

module.exports = apollo;
