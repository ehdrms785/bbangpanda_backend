import { gql } from "apollo-server-express";
import client from "../client";
import { Resolvers } from "../types";

const DibsDrawerResolvers: Resolvers = {
    DibsDrawer: {
        item:async ({id}, {count}:{count: number | undefined}, {client}) => {
                console.log(id);
                console.log("here?");
            const result = await client.bread.findMany({
                where: {
                dibsDrawers: {
                    is: {
                        id: {
                            equals: id
                        }
                    }
                }
                },
                select: {
                    id: true,
                    name: true,
                    thumbnail: true,
                    price: true,
                    discount: true,
                    description: true,

                },
                ...(count && {take: count})
            });
            console.log("여기보자");
            console.log(result);
            return result;
        },
        itemCount: async ({id},_,{client}) => await client.bread.count({
            where: {
                dibsDrawers: {
                    is: {
                        id: id
                    }
                }
            }
        }) ,
    }
}

export default DibsDrawerResolvers;