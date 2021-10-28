import client from "../client";
import { makeErrorMessage } from "../shared/shared.utils";


export const dibsDrawerIsMineCheck = async ({
    id,
    loggedInUserId,
}:{id: number; loggedInUserId?: number;})  => {
    const dibsDrawerExist = await client.dibsDrawer.findFirst({
        where: {
            id: id
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
    const dibsDrawerIsMine = await client.dibsDrawer.findFirst({
        where: {
            id: id,
            dibsDrawerList: {
                userId: loggedInUserId
            }
        },
        select: {
            id: true
        }
    });
    if(dibsDrawerIsMine == null) {
        return {
            ok: false,
            error: makeErrorMessage("X00340", "서랍기능에 오류가 생겼습니다.")
        }
    }
    return {
        ok: true
    }
}