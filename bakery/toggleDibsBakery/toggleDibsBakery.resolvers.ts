import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";


const toggleDibsBakeryMutation: Resolvers = {
    Mutation: {
        toggleDibsBakery: protectResolver(async (_, { bakeryId }: { bakeryId: number }, { client, loggedInUser }) => {

            console.log("toggleDibsBakery!");
            const existUser = await client.user.findFirst({
                where: {
                    id: loggedInUser?.id
                },
                select: {
                    id: true,

                }
            });
            if (!existUser) {
                return {

                    ok: false,
                    
                    errors: makeErrorMessage("X01001", '로그인 데이터가 온전하지 않습니다. 로그아웃 이후 다시 이용해 주세요')
                }
            }
            const alreadyGotDibsUser = await client.user.findFirst({
                where: {
                    id: existUser.id,
                    dibsBakeries: {
                        some: {
                            id: bakeryId
                        }
                    }


                },
                select: {
                    id: true
                }
            });


            await client.user.update({
                where: {
                    id: existUser.id
                },
                data: {
                    dibsBakeries: {
                        ...(alreadyGotDibsUser && {
                            connect: {
                                id: bakeryId


                            
                            
                            }

                        }

                        ),
                        ...(!alreadyGotDibsUser && {
                            disconnect: {
                                id: bakeryId
                            }
                        }),
                    }
                }
            });
            console.log(`Boolean Check : ${Boolean(alreadyGotDibsUser)}`);
            return {
                ok: true,
            };

        }
        )
    }
}

export default toggleDibsBakeryMutation;