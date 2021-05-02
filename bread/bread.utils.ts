import client from "../client";

export const getBreadsFromBakery = (bakeryId: number, cursorBreadId?: number) =>
  client.bread.findMany({
    where: {
      bakeryId,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: cursorBreadId ? 1 : 0,
    take: 2,
    ...(cursorBreadId && { cursor: { id: cursorBreadId } }),
  });
