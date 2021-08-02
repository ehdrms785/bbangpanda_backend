import { Resolvers } from "../../types";


const getBakeryDescriptionQuery : Resolvers = {
  Query: {
    getBakeryDescription:  (_,{bakeryId}:{bakeryId: number},{client}) => client.bakery.findFirst({
        where: {
            id: bakeryId
        },
        select: {
            name: true,
            address: true,
            bakeryFeatures: true,
            description: true,
            detailDescription: true,

        }
    })
  }
}


export default getBakeryDescriptionQuery;