import { PrismaClient } from ".prisma/client";
import { User } from ".prisma/client";

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
  token: string;
  ip: string;
  expired?: Boolean;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};

export type Subscriptions = {
  [key: string]: {
    [key: string]: {
      [key: string]: Resolver;
    };
  };
};

// export default MutationResponseType = {
//   ok: !Boolean;
//   error: String;
// };
