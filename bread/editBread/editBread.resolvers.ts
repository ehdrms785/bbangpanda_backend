import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";

const EditBreadMutation: Resolvers = {
  Mutation: {
    editBread: protectResolver(
      async (
        _,
        {
          breadId,
          name,
          price,
          description,
          detailDescription,
        }: {
          breadId: number;
          name?: string;
          price?: number;
          description?: string;
          detailDescription?: string;
        },
        { client, loggedInUser },
        __
      ) => {
        if (!breadId) {
          return {
            ok: false,
            error: makeErrorMessage("X00065", "제공된 breadId가 없습니다."),
          };
        }
        if (!name && !price && !description && !detailDescription) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00066",
              "한 개 이상의 수정사항을 입력해주세요."
            ),
          };
        }
        const breadExisted = await client.bread.findFirst({
          where: {
            id: breadId,
            bakery: {
              ownerId: loggedInUser?.id,
            },
          },
          select: {
            id: true,
          },
        });

        if (!breadExisted) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00067",
              "해당 id를 가진 빵이 존재하지 않습니다."
            ),
          };
        }
        try {
          await client.bread.update({
            where: {
              id: breadId,
            },
            data: {
              ...(name && { name }),
              ...(price && { price }),
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
            error: makeErrorMessage("X00068", "빵 업데이트 실패"),
          };
        }
      }
    ),
  },
};

export default EditBreadMutation;
