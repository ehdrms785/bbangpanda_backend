import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import { comparePassword, protectResolver } from "../users.utils";
const DeleteUserMutation: Resolvers = {
  Mutation: {
    deleteUser: protectResolver(
      async (
        _,
        {
          phonenumber,
          password,
        }: {
          phonenumber: string;
          password: string;
        },
        { client, loggedInUser }
      ) => {
        try {
          if (!phonenumber || !password) {
            return {
              ok: false,
              error: "X00016",
            };
          }
          const user = await client.user.findUnique({
            where: {
              id: loggedInUser?.id,
              phonenumber,
            },
            select: {
              password: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "X00017",
            };
          }
          const passwordCheck = await comparePassword(password, user.password);
          if (!passwordCheck) {
            return {
              ok: false,
              error: "X00018",
            };
          }
          await client.user.delete({
            where: {
              id: loggedInUser?.id,
            },
          });
          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: e,
          };
        }
      }
    ),
  },
};

export default DeleteUserMutation;
