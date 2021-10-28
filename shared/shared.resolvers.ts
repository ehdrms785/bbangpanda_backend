import { Resolvers } from "../types";
import { generateRandomCode, makeErrorMessage } from "./shared.utils";
const SharedResolvers: Resolvers = {
  Mutation: {
    sendSms: (_, { phonenumber }: { phonenumber: string }, __) => {
      var CryptoJS = require("crypto-js");
      var user_auth_number = generateRandomCode(4);
      console.log(`auth_number: ${user_auth_number}`);
      var resultCode = 404;
      var request = require("request");
      var serviceId = `${process.env.SMS_SERVICE_ID}`;
      var secretKey = `${process.env.SMS_SECRET_KEY}`;
      var accessId = `${process.env.SMS_ACCESS_ID}`;
      const date = Date.now().toString();
      const uri = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`;
      const uri2 = `/sms/v2/services/${serviceId}/messages`;
      const method = "POST";
      const space = " ";
      const newLine = "\n";

      const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
      hmac.update(method);
      hmac.update(space);
      hmac.update(uri2);
      hmac.update(newLine);
      hmac.update(date);
      hmac.update(newLine);
      hmac.update(accessId);

      const hash = hmac.finalize();
      const signature = hash.toString(CryptoJS.enc.Base64);
      request(
        {
          method: method,
          json: true,
          uri: uri,
          headers: {
            "Content-Type": "application/json",
            "x-ncp-apigw-timestamp": date,
            "x-ncp-iam-access-key": accessId,
            "x-ncp-apigw-signature-v2": signature,
          },
          body: {
            type: "SMS",
            countryCode: "82",
            from: "01000000000", // Phone Number
            content: `[빵판다] 인증코드: ${user_auth_number}`,
            messages: [
              {
                to: `${phonenumber}`,
              },
            ],
          },
        },
        function (err: any, res: any, html: any) {
          if (err) {
            console.log(err);
            return {
              ok: false,
              error: makeErrorMessage(
                "X00251",
                "인증코드 발송 중 오류가 발생 했습니다."
              ),
            };
          } else {
            resultCode = 200;
            console.log(html);
          }
        }
      );
      return {
        ok: true,
        code: user_auth_number,
      };
    },
  },
};

export default SharedResolvers;
