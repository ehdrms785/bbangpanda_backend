import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { dibsDrawerIsMineCheck } from "../dibsDrawerSharedFunctions";

const RemoveItemToDibsDrawerMutation:Resolvers = {
    Mutation: {
        removeItemToDibsDrawer: protectResolver(async(_,{itemId}:{itemId: number;}, {client,loggedInUser})=>  {
           
            const itemExist = await client.bread.findFirst({
                where: {
                    id: itemId
                },
                select: {
                    id: true
                }
            });
            if(itemExist == null) {
                return {
                    ok: false,
                    error: makeErrorMessage("X00321-1", "존재하지 않는 상품 입니다")
                }
            }
           try {
            const dibsDrawerExist = await client.dibsDrawer.findFirst({
                where: {
                    dibsDrawerList: {
                        userId: loggedInUser?.id
                    },
                    item: {
                        some: {
                            id: itemId
                        }
                    }
                },
                select: {
                    id: true
                }
            });
            if(dibsDrawerExist == null) {
                return {
                    ok: false,
                    error: makeErrorMessage("X00320", "존재하지 않는 서랍입니다.")
                }
            }

            await client.user.update({
                where: {
                    id: loggedInUser?.id
                },
                data: {
                    dibsBreads: {
                        disconnect: {
                            id: itemId
                        }
                    }
                },
               
            })
            await client.dibsDrawer.update({
                where: {
                    id: dibsDrawerExist.id
                },
                data: {
                    item: {
                        disconnect: {
                            id: itemId
                        }
                    }
                }
            })
          
           
            
           }catch(err) {
               console.log('RemoveItemToDibsDrawer 에러 발생');
               console.log(err);
               return {
                   ok: false,
                   error: makeErrorMessage("X00323", "서랍에 아이템을 제거하는 도중 오류가 발생했습니다.")
               }
           }
           return {
               ok: true
           }
        })
    }
}

export default RemoveItemToDibsDrawerMutation;