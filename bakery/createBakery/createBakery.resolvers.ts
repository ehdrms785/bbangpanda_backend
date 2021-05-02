import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";

const CreateBakeryMutation: Resolvers = {
  Mutation: {
    createBakery: protectResolver(
      async (
        _,
        {
          name,
          address,
          description,
          detailDescription,
        }: {
          name: string;
          address?: string;
          description?: string;
          detailDescription?: string;
        },
        { client, loggedInUser },
        __
      ) => {
        if (!name) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00101",
              "베이커리 이름은 필수 입력값 입니다"
            ),
          };
        }
        const bakeryExist = await client.bakery.findFirst({
          where: {
            name,
          },
        });
        if (bakeryExist) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00102",
              "해당 이름을 가진 베이커리가 이미 존재합니다."
            ),
          };
        }
        try {
          await client.bakery.create({
            data: {
              name,
              owner: {
                connect: {
                  id: loggedInUser?.id,
                },
              },
              ...(address && { address }),
              ...(description && { description }),
              ...(detailDescription && { detailDescription }),
            },
          });
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            error: makeErrorMessage(
              "X00103",
              "새로운 빵집을 만들지 못했습니다."
            ),
          };
        }
      }
    ),
  },
};

export default CreateBakeryMutation;
