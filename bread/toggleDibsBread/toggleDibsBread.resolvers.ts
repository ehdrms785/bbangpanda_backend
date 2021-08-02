import { makeErrorMessage } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protectResolver } from "../../users/users.utils";


const toggleDibsBreadMutation: Resolvers = {
    Mutation: {
        toggleDibsBread: protectResolver(async (_, { breadId }: { breadId: number }, { client, loggedInUser }) => {


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
                    
                    error: makeErrorMessage("X01001", '로그인 데이터가 온전하지 않습니다. 로그아웃 이후 다시 이용해 주세요')
                }
            }
            const alreadyGotDibsUser = await client.user.findFirst({
                where: {
                    id: existUser.id,
                    dibsBreads: {
                        some: {
                            id: breadId
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
                    dibsBreads: {
                        ...(alreadyGotDibsUser && {
                            connect: {
                                id: breadId


                            
                            
                            }

                        }

                        ),
                        ...(!alreadyGotDibsUser && {
                            disconnect: {
                                id: breadId
                            }
                        }),
                    }
                }
            });

            return {
                ok: true
            };

        }
        )
    }
}

export default toggleDibsBreadMutation;