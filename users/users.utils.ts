import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";
import crypto from "crypto-js";
import bcrypt from "bcrypt";
// import {MutationResponse} from "../types";

export const getUser = async (accessToken: string | undefined) => {
  try {
    console.log("getUser 들어왔다");
    if (!accessToken || !accessToken.startsWith("Bearer ")) {
      return null;
    }
    accessToken = accessToken.substr(7);
    const { id } = verifyToken(accessToken) as {
      id: number;
    };
    const user = await client.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      console.log("유저 있음");
      return user;
    } else {
      return null;
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      console.log("토큰 만료");
      return null;
    } else if (err instanceof JsonWebTokenError) {
      console.log("토큰 인증 불가");
      return null;
    }
    console.log(err);
    return null;
  }
};

export const protectResolver = (ourResolver: Resolver): Resolver => async (
  root,
  args,
  context,
  info
) => {
  try {
    if (!context.loggedInUser) {
      let isQuery = info.operation.operation === "query";
      if (isQuery) {
        return null;
      } else {
        return {
          ok: false,
          error: "You need to login",
        };
      }
    }
  } catch (err) {
    console.log(err);
  }
  return ourResolver(root, args, context, info);
};

export const comparePassword = async (
  password: string,
  hashPassword: string
) => {
  return bcrypt.compare(password, hashPassword);
};
export const generateKey = (clientIp: string): string => {
  console.log(`clientIp : ${clientIp}`);
  let splitedIp: string[] = [];
  if (clientIp.includes(".")) {
    splitedIp = clientIp.split(".");
  } else if (clientIp.includes(":")) {
    splitedIp = clientIp.split(":");
  }
  const key = `${splitedIp[0].substring(0, 2)}${
    process.env.TOKEN_KEY_VALUE
  }${splitedIp[1].substring(0, 2)}`;
  console.log(key);
  return key;
};

export const encryptToken = (token: string) => {
  return crypto.AES.encrypt(token, `${process.env.ENCRYPT_KEY}`).toString();
};
export const decryptToken = (token: string) => {
  try {
    const newToken = crypto.AES.decrypt(
      token,
      `${process.env.ENCRYPT_KEY}`
    ).toString(crypto.enc.Utf8);
    return newToken;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getAccessToken = async (id: number): Promise<string> => {
  return jwt.sign({ id }, `${process.env.SECRET_KEY}`, {
    expiresIn: "30m",
  });
};
export const getRefreshToken = async (id: number): Promise<string> => {
  return jwt.sign(
    {
      key: `${id}${process.env.RSKEY}`,
    },
    `${process.env.SECRET_KEY}`,
    {
      expiresIn: `${process.env.REFTOKEN_EXPIRE}`,
    }
  );
};
export const refTokenExtractKey = (refreshToken: string) => {
  return `
  ${refreshToken.substring(10, 12)}${refreshToken.substring(
    20,
    22
  )}${refreshToken.substring(30, 32)}
  `.trim();
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, `${process.env.SECRET_KEY}`);
};
