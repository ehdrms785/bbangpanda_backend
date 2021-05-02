import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";

const EditBakeryMutation: Resolvers = {
  Mutation: {
    editBakery: protectResolver(
      async (
        _,
        {
          name,
          address,
          description,
          detailDescription,
        }: {
          name?: string;
          address?: string;
          description?: string;
          detailDescription?: string;
        },
        { client, loggedInUser },
        __
      ) => {
        if (!name && !address && !description && !detailDescription) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00110",
              "최소 하나 이상의 바뀐 정보를 제공해야 합니다."
            ),
          };
        }
        if (name) {
          const nameExistCheck = await client.bakery.findUnique({
            where: {
              name,
            },
            select: {
              id: true,
            },
          });
          if (nameExistCheck) {
            return {
              ok: false,
              error: makeErrorMessage(
                "X00111",
                "해당 이름을 사용하는 베이커리가 이미 존재합니다."
              ),
            };
          }
        }
        const bakeryExist = await client.bakery.findFirst({
          where: {
            ownerId: loggedInUser?.id,
          },
          select: {
            id: true,
          },
        });
        if (!bakeryExist) {
          return {
            ok: false,
            error: makeErrorMessage("X00112", "소유중인 빵집이 없습니다"),
          };
        }
        try {
          await client.bakery.update({
            where: {
              id: bakeryExist.id,
            },
            data: {
              ...(name && { name }),
              ...(address && { address }),
              ...(description && { description }),
              ...(detailDescription && { detailDescription }),
            },
          });
          return {
            ok: true,
          };
        } catch (err) {
          return {
            ok: false,
            error: makeErrorMessage("X00113", "빵집 업데이트 실패"),
          };
        }
      }
    ),
  },
};

export default EditBakeryMutation;
