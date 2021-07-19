import { Resolvers } from "../../types";
import { makeErrorMessage } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";

const CreateBreadMutation: Resolvers = {
  Mutation: {
    createBread: protectResolver(
      async (
        _,
        {
          breadLargeCategoryId,
          breadSmallCategoryId,
          name,
          costPrice,
          discount,
          description,
          detailDescription,
        }: {
          breadLargeCategoryId: string;
          breadSmallCategoryId: string;
          name: string;
          costPrice: number;
          discount: number;
          description?: string;
          detailDescription?: string;
        },
        { client, loggedInUser },
        __
      ) => {
        if (!name || !costPrice) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00051",
              "이름과 가격 모두 입력해야 합니다."
            ),
          };
        }
        // 내 빵집이 맞는지 체크
        const myBakery = await client.bakery.findFirst({
          where: {
            ownerId: loggedInUser?.id,
          },
          select: {
            id: true,
          },
        });

        const breadExisted = await client.bread.findFirst({
          where: {
            bakeryId: myBakery?.id,
            name,
          },
          select: {
            id: true,
          },
        });
        if (breadExisted) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00052",
              "해당 이름을 가진 빵이 이미 존재합니다."
            ),
          };
        }

        try {
          await client.bread.create({
            data: {
              name,
              costPrice,
              ...(discount && { discount }),
              price:
                Math.floor((costPrice - costPrice * (discount / 100)) / 10) *
                10,
              bakery: {
                connect: {
                  id: myBakery?.id,
                },
              },
              ...(description && { description }),
              ...(detailDescription && { detailDescription }),
              breadLargeCategory: {
                connect: {
                  id: breadLargeCategoryId,
                },
              },
              breadSmallCategory: {
                connect: {
                  id: breadSmallCategoryId,
                },
              },
            },
          });
          await client.breadLargeCategory.update({
            where: {
              id: breadLargeCategoryId,
            },
            data: {
              bakeries: {
                connect: {
                  id: myBakery?.id,
                },
              },
            },
          });
          await client.breadSmallCategory.update({
            where: {
              id: breadSmallCategoryId,
            },
            data: {
              bakeries: {
                connect: {
                  id: myBakery?.id,
                },
              },
            },
          });
          // await client.bakery.findUnique({
          //   where: {
          //     id: myBakery?.id
          //   },

          // })
          return {
            ok: true,
          };
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            error: makeErrorMessage(
              "X00053",
              "새로운 빵을 만들지 못했습니다. "
            ),
          };
        }
      }
    ),
  },
};

export default CreateBreadMutation;
