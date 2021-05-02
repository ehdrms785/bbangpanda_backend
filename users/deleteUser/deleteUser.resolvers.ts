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
          if (!phonenumber || !password) {
            return {
              ok: false,
              error: makeErrorMessage("X00016", "입력 된 정보가 없습니다."),
            };
          }
          let user;
          try {
            user = await client.user.findUnique({
              where: {
                id: loggedInUser?.id,
                phonenumber,
              },
              select: {
                id: true,
                password: true,
              },
            });
          } catch (err) {
            return {
              ok: false,
              error: makeErrorMessage(
                "X00016-1",
                "해당 계정의 정보가 일치하지 않습니다."
              ),
            };
          }
          if (!user) {
            return {
              ok: false,
              error: makeErrorMessage("X00017", "해당하는 유저가 없습니다."),
            };
          }
          const passwordCheck = await comparePassword(password, user.password);
          if (!passwordCheck) {
            return {
              ok: false,
              error: makeErrorMessage("X00018", "비밀번호 오류"),
            };
          }
          const firebaseUser = await getFirebaseUser(user.id);
          if (!firebaseUser) {
            return {
              ok: false,
              error: makeErrorMessage("X00019", "해당하는(FB) 정보가 없습니다"),
            };
          }
          await deleteFirebaseUser(user.id);

          await client.user.delete({
            where: {
              id: user.id,
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
