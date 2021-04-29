import { Resolvers } from "../../types";
import { protectResolver } from "../users.utils";

const EditProfileMutation: Resolvers = {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          username,
          avatar,
          address,
          phonenumber,
        }: {
          username?: string;
          avatar?: string;
          address?: string;
          phonenumber?: string;
        },
        { client, loggedInUser }
      ) => {
        if (!username && !avatar && !address && !phonenumber) {
          return {
            ok: false,
            error: "X00030",
          };
        }
        try {
          const updatedUser = await client.user.update({
            where: {
              id: loggedInUser?.id,
            },
            data: {
              username,
              avatar,
              address,
              phonenumber,
            },
            select: {
              id: true,
            },
          });

          if (updatedUser?.id) {
            return {
              ok: true,
            };
          } else {
            throw new Error();
          }
        } catch (e) {
          return {
            ok: false,
            error: "X00031",
          };
        }
      }
    ),
  },
};

export default EditProfileMutation;
