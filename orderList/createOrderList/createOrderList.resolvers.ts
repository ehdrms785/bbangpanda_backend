import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";

const CreateOrderListMutation: Resolvers = {
  Mutation: {
    createOrderList: protectResolver(
      async (
        _,
        {
          breadIdList,
          payAmount = 0,
          shippingFee = 0,
          discountAmount = 0,
        }: {
          breadIdList: number[];
          payAmount: number;
          shippingFee?: number;
          discountAmount?: number;
        },
        { client }
      ) => {
        if (!breadIdList || breadIdList.length === 0) {
          return {
            ok: false,
            error: makeErrorMessage(
              "X00201",
              "최소 하나 이상의 빵을 결제 해야 합니다."
            ),
          };
        }
        client.orderList.create({
          data: {
            // id: 1213,
            orderList: {
              connect: {},
              create: {
                orderNumber: 1, // Need to update orderNumber Logic
                payAmount: payAmount,
                shippingFee: shippingFee,
                discountAmount: discountAmount,
              },
            },
          },
        });
      }
    ),
  },
};
export default CreateOrderListMutation;
