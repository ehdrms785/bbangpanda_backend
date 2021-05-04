import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const CreateCartBreadMutation: Resolvers = {
  Mutation: {
    createCartBread: protectResolver(
      async (_, { breadId }: { breadId: number }, { client, loggedInUser }) => {
        if (!breadId) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00151",
              "장바구니 추가에 필요한 정보가 부적합니다."
            ),
          };
        }
        const breadExist = await client.bread.findFirst({
          where: {
            id: breadId,
          },
          select: {
            id: true,
            bakeryId: true,
          },
        });
        if (!breadExist) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00151-1",
              "해당 빵집에 해당 Id를 가진 빵이 존재하지 않습니다"
            ),
          };
        }
        const isAlreadyInCart = await client.user.findFirst({
          where: {
            id: loggedInUser?.id,
            cartBreads: {
              some: {
                breadId,
              },
            },
          },
          select: {
            id: true,
          },
        });
        if (isAlreadyInCart) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00152 ",
              "이미 해당 빵이 장바구니에 있습니다"
            ),
          };
        }
        try {
          await client.cartBread.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser?.id,
                },
              },
              bread: {
                connect: {
                  id: breadId,
                },
              },
              bakeryId: breadExist.bakeryId as number,
            },
          });
        } catch (err) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00153",
              "장바구니에 빵을 추가중 문제가 생겼습니다."
            ),
          };
        }

        return {
          ok: true,
        };
      }
    ),
  },
};

export default CreateCartBreadMutation;
