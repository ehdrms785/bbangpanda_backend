import { Resolvers } from "../../types";
import bcrypt from "bcrypt";
import admin from "firebase-admin";
import { createRequest } from "@graphql-tools/delegate";
const CreateUserMutation: Resolvers = {
  Mutation: {
    createUser: async (
      _,
      {
        username,
        email,
        address,
        phonenumber,
        password,
      }: {
        username: string;
        email: string;
        address?: string;
        phonenumber: string;
        password: string;
      },
      { client }
    ) => {
      try {
        const userExist = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                phonenumber,
              },
              {
                email: email.toLowerCase(),
              },
            ],
          },
        });
        if (userExist) {
          return {
            ok: false,
            error: "X00020",
          };
        }
        const hashedPassword = await bcrypt.hash(
          password,
          Number(process.env.HASHCOUNT)
        );
        const createdUser = await client.user.create({
          data: {
            username,
            email: email.toLowerCase(),
            address,
            phonenumber,
            password: hashedPassword,
          },
          select: {
            id: true,
            email: true,
            phonenumber: true,
          },
        });
        const updateParams = {
          uid: createdUser.id.toString(),
          email: createdUser.email,
          phoneNumber: `+82${createdUser.phonenumber.replace("0", "")}`,
        };
        console.log(
          `phoneNumber: +82${createdUser.phonenumber.replace("0", "")}`
        );
        var user;
        //
        try {
          user = await admin.auth().createUser(updateParams as any);
        } catch (err) {
          console.log(err);
          return {
            ok: false,
            error: "파이어베이스 회원가입실패",
          };
        }
        // console.log(user);
        // try {
        //   user = await admin.auth().getUserByEmail(email);
        // } catch (err) {
        //   console.log(err);

        // }
        //  try {

        //   var uid = (await admin.auth().getUserByEmail("firebase@naver.com")).uid;
        //   console.log(`uid: ${uid}`);
        //  } catch( e) {

        //  }
        // admin.auth().deleteUser(uid);
        // // console.log(`userId:${user.uid}`);
        // return {
        //   ok: true,
        // };
        const customToken = await admin.auth().createCustomToken(user.uid);
        // console.log(`customToken:${customToken}`);
        return {
          ok: true,
          customToken,
        };
      } catch (e) {
        console.log(e);
        return {
          ok: false,
          error: "X00021",
        };
      }
    },
  },
};

export default CreateUserMutation;
