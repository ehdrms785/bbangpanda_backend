import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { dibsDrawerIsMineCheck } from "../dibsDrawerSharedFunctions";


const DeleteDibsDrawerMutation:Resolvers = {
    Mutation: {
        deleteDibsDrawer: protectResolver(
            async(_,{id}:{id: number;}, {client,loggedInUser}) => {
                try {
                    const dibsDrawerIsMine = await dibsDrawerIsMineCheck({id: id, loggedInUserId: loggedInUser!.id});
                    if(dibsDrawerIsMine.ok === false) {
                        return dibsDrawerIsMine;
                    }
                    console.log(dibsDrawerIsMine);
                    await client.dibsDrawer.delete({
                        where: {
                            id: id
                        }
                    });

                    return {
                        ok: true
                    }
                }catch(err) {
                    console.log('DeleteDibsDrawer Error');
                    console.log(err);
                    return {
                        ok: false,
                        error: makeErrorMessage("X00311", "서랍을 삭제하지 못했습니다.")
                    }
                }
            }
        )
    }
}

export default DeleteDibsDrawerMutation;