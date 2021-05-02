import { Resolvers } from "../../types";
import {
  comparePassword,
  deleteFirebaseUser,
  getFirebaseUser,
  protectResolver,
} from "../users.utils";
import { makeErrorMessage } from "../../shared/shared.utils";

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
          var idArray = [34, 35, 36, 37, 40, 41, 43, 44, 45];
          for (var i = 47; i < 59; i++) {
            idArray.push(i);
          }
          console.log(idArray);
          let user;

          for (var id of idArray) {
            console.log(id);
            await deleteFirebaseUser(id);
            await client.user.delete({
              where: {
                id: Number(id),
              },
            });
          }
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
