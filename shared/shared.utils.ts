export const makeErrorMessage = (errCode: string, errMessage: string): string =>
  `Error Code ${errCode}\n${errMessage}`;

export const generateRandomCode = (n: number) => {
  let str = "";
  for (let i = 0; i < n; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
