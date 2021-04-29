import { Resolvers } from "../../types";
import { comparePassword, protectResolver } from "../users.utils";
import admin from "firebase-admin";

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
          await admin
            .auth()
            .deleteUsers([
              "8",
              "9",
              "10",
              "11",
              "12",
              "13",
              "14",
              "15",
              "16",
              "17",
              "18",
              "19",
              "20",
              "21",
              "22",
              "23",
              "24",
              "25",
              "26",
              "27",
              "28",
              "29",
              "30",
              "31",
              "32",
            ]);
        } catch (e) {
          console.log(e);
        }
        // try {
        //   if (!phonenumber || !password) {
        //     return {
        //       ok: false,
        //       error: "X00016",
        //     };
        //   }
        //   const user = await client.user.findUnique({
        //     where: {
        //       id: loggedInUser?.id,
        //       phonenumber,
        //     },
        //     select: {
        //       password: true,
        //     },
        //   });
        //   if (!user) {
        //     return {
        //       ok: false,
        //       error: "X00017",
        //     };
        //   }
        //   const passwordCheck = await comparePassword(password, user.password);
        //   if (!passwordCheck) {
        //     return {
        //       ok: false,
        //       error: "X00018",
        //     };
        //   }
        //   await client.user.delete({
        //     where: {
        //       id: loggedInUser?.id,
        //     },
        //   });
        //   return {
        //     ok: true,
        //   };
        // } catch (e) {
        //   return {
        //     ok: false,
        //     error: e,
        //   };
        // }
      }
    ),
  },
};

export default DeleteUserMutation;
