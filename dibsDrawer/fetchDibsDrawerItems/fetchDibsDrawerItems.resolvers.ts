import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";
import { dibsDrawerIsMineCheck } from "../dibsDrawerSharedFunctions";


const FetchDibsDawerItemsQuery : Resolvers = {
    Query: {
        fetchDibsDrawerItems: protectResolver(async (_,{drawerId, cursorBreadId}:{drawerId: number, cursorBreadId:number},{client,loggedInUser}, __) => {
            console.log("1번");
            const dibsDrawerIsMine = await dibsDrawerIsMineCheck({id: drawerId, loggedInUserId: loggedInUser?.id});
            console.log("2번");

            if(dibsDrawerIsMine.ok === false) {
                return null;
            }

            console.log('fetchDibsDrawerItems 쿼리시작');
           try {
            const result =  await client.bread.findMany({
                where: {
                    dibsDrawers: {
                        is: {
                            id: drawerId
                        }
                    }
                },
                select: {
                    id: true,
                    name: true,
                    //bakeryName 은 resolver에 있음 
                    thumbnail: true,
                    description: true,
                    price: true,
                    discount: true
                },
                skip: cursorBreadId ? 1: 0,
                take: 2,
                ...(cursorBreadId && { cursor: {id: cursorBreadId}})
            });
            console.log("fetchDibsDrawer Result 확인");
            console.log(result);
            return result;
           } catch(err) {
               console.log("FetchDibsDrawerItems 에러 발생");
               console.log(err);
           }
        }
    ),
    }
}

export default FetchDibsDawerItemsQuery;