import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { dibsDrawerIsMineCheck } from "../dibsDrawerSharedFunctions";

const ChangeDibsDrawerNameMutation:Resolvers = {
    Mutation: {
        changeDibsDrawerName: protectResolver(async (_,{id, name}:{id: number, name:string},{client,loggedInUser}) => {
            try {
                const dibsDrawerIsMine = await dibsDrawerIsMineCheck({id: id, loggedInUserId: loggedInUser!.id});
                if(dibsDrawerIsMine.ok === false) {
                    return dibsDrawerIsMine;
                }
                await client.dibsDrawer.update({
                    where: {
                        id: id
                    },
                    data: {
                        name: name
                    }
                });
                return {
                    ok: true
                }

            }catch(err) {
                console.log("ChangeDibsDrawerName Error");
                console.log(err);
                return {
                    ok: false,
                    error: makeErrorMessage("X00331", "서랍 이름 변경중 오류가 발생했습니다.")
                }
            }
        })
    }
}


export default ChangeDibsDrawerNameMutation;