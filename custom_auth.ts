import admin from "firebase-admin";
const Async = require("async");
const axios = require("axios");

const kakaoRequestMeUrl = "https://kapi.kakao.com/v2/user/me";

/**
 * requestMe - Returns user profile from Kakao API
 *
 * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
 * @return {Promiise<Response>}      User profile response in a promise
 */
function requestMe(
  kakaoAccessToken: string,
  callback: {
    (error: any, response: any, boy: any): any;
    (arg0: null, arg1: any, arg2: any): void;
  }
) {
  console.log(
    "Requesting user profile from Kakao API server. " + kakaoAccessToken
  );
  return axios
    .get(kakaoRequestMeUrl, {
      method: "GET",
      headers: { Authorization: "Bearer " + kakaoAccessToken },
    })
    .then((result: any) => {
      callback(null, result.data, result);
    });
}

/**
 * updateOrCreateUser - Update Firebase user with the give email, create if
 * none exists.
 *
 * @param  {String} userId        user id per app
 * @param  {String} email         user's email address
 * @param  {String} displayName   user
 * @param  {String} photoURL      profile photo url
 * @return {Prommise<UserRecord>} Firebase user record in a promise
 */
function updateOrCreateUser(
  userId: string,
  email: string,
  displayName: string,
  photoURL: string
) {
  console.log("updating or creating a firebase user");
  const updateParams = {
    provider: "KAKAO",
    displayName: displayName,
  };
  if (displayName) {
    updateParams["displayName"] = displayName;
  } else {
    updateParams["displayName"] = email;
  }
  if (photoURL) {
    // updateParams["photoURL"] = photoURL;
  }
  console.log(updateParams);
  return admin
    .auth()
    .updateUser(userId, updateParams)
    .then(function (userRecord: any) {
      // See the UserRecord reference doc for the contents of `userRecord`.
      console.log("Successfully updated user", userRecord.toJSON());
      userRecord["uid"] = userId;
      if (email) {
        userRecord["email"] = email;
      }
      return admin.auth().createUser(userRecord);
    });
}

/**
 * createFirebaseToken - returns Firebase token using Firebase Admin SDK
 *
 * @param  {String} kakaoAccessToken access token from Kakao Login API
 * @return {Promise<String>}                  Firebase token in a promise
 */
function createFirebaseToken(kakaoAccessToken: string, callback: any) {
  Async.waterfall(
    [
      (next: any) => {
        requestMe(kakaoAccessToken, (error: any, response: any, boy: any) => {
          console.log(response);
          const body = response; // JSON.parse(response)
          console.log(body);
          const userId = `kakao:${body.id}`;
          if (!userId) {
            return response.status(404).send({
              message: "There was no user with the given access token.",
            });
          }
          let nickname = null;
          let profileImage = null;
          if (body.properties) {
            nickname = body.properties.nickname;
            profileImage = body.properties.profile_image;
          }

          const updateParams = {
            uid: userId,
            email: body.kakao_account.email,
            provider: "KAKAO",
            displayName: nickname,
          };
          if (nickname) {
            updateParams["displayName"] = nickname;
          } else {
            updateParams["displayName"] = body.kakao_account.email;
          }
          if (profileImage) {
            // updateParams["photoURL"] = profileImage;
          }

          next(null, updateParams);
        });
      },
      (userRecord: any, next: any) => {
        console.log(userRecord.email);
        admin
          .auth()
          .getUserByEmail(userRecord.email)
          .then((userRecord: any) => {
            next(null, userRecord);
          })
          .catch((error: any) => {
            console.log(error);
            admin
              .auth()
              .createUser(userRecord)
              .then((user: any) => {
                next(null, user);
              });
          });
      },
      (userRecord: any, next: any) => {
        console.log(userRecord);
        console.log("**************");
        const userId = userRecord.uid;
        console.log(`creating a custom firebase token based on uid ${userId}`);
        admin
          .auth()
          .createCustomToken(userId, { provider: "KAKAO" })
          .then((result: any) => {
            console.log(result);
            next(null, result);
          });
      },
    ],
    (err: any, results: any) => {
      console.log(results);
      callback(results);
    }
  );
}

module.exports = {
  createFirebaseToken,
};
