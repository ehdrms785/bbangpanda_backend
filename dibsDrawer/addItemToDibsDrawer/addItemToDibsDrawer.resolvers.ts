import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { dibsDrawerIsMineCheck } from "../dibsDrawerSharedFunctions";

const AddItemToDibsDrawerMutation:Resolvers = {
    Mutation: {
        addItemToDibsDrawer: protectResolver(async(_,{id,itemId}:{id: number; itemId: number;}, {client,loggedInUser})=>  {
           
           const dibsDrawerIsMine = await dibsDrawerIsMineCheck({id: id, loggedInUserId: loggedInUser!.id});
           if(dibsDrawerIsMine.ok === false) {
               return dibsDrawerIsMine;
           }

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
                    error: makeErrorMessage("X00321", "존재하지 않는 상품 입니다")
                }
            }
           try {
            await client.dibsDrawer.update({
                where: {
                    id: id
                },
                data: {
                    item: {
                        connect: {
                            id: itemId
                        }
                    }
                }
            });
            await client.user.update({
                where: {
                    id: loggedInUser?.id
                },
                data: {
                   dibsBreads: {
                       connect: {
                           id: itemId
                       }
                   }
                }
            })
            
           }catch(err) {
               console.log('AddItemToDibsDrawer 에러 발생');
               console.log(err);
               return {
                   ok: false,
                   error: makeErrorMessage("X00322", "서랍에 아이템을 추가하는 도중 오류가 발생했습니다.")
               }
           }
           return {
               ok: true
           }
        })
    }
}

export default AddItemToDibsDrawerMutation;