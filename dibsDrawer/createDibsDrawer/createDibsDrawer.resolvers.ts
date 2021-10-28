import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";


const CreateDibsDrawerMutation:Resolvers = {
    Mutation: {
        createDibsDrawer: protectResolver(
            async(_,{name}:{name: string;}, {client, loggedInUser}) => {
               try {


                const dibsDrawerList = await client.dibsDrawerList.findFirst({
                    where: {
                        userId: loggedInUser?.id
                    },
                    select: {
                        id: true
                    }
                });
                if(dibsDrawerList == null) {
                    return {
                        ok: false,
                        error: makeErrorMessage("X00301","서랍 생성 도중 문제가 생겼습니다.")
                    }
                }
                const result = await client.dibsDrawer.create({
                    data: {
                        name: name,
                        dibsDrawerList: {
                           connect: {
                               id: dibsDrawerList.id
                           }
                        }
                    },
                    select: {
                        id: true,
                        name: true
                    }
                });
                console.log('dibsDrawer 리턴 하는거 맞아?');
                console.log(result);
                return {
                    ok: true,
                    dibsDrawer: result
                }
               } catch(err) {
                   console.log("CreateDibsDrawer Error!");
                   console.log(err);
                   return {
                       ok: false,
                       error: makeErrorMessage(
                           "X00302",
                           "새로운 서랍을 만들지 못했습니다."
                       )
                   }
               }
                
            }
        )
    }
}

export default CreateDibsDrawerMutation;