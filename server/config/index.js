/**
 * 生成两个TOKEN
 * access_token：访问API的TOKEN   => key
 * refresh_token: 刷新访问TOKEN的token   => key
 */
const ACCESS_TOKEN_KEY = "fdsjsdfdsfsfsddfserewrwerwrwr204b";
const REFRESH_TOKEN_KEY = "f3234234fsdfsfesdfsdsfksflsf323cf";

const ALLOW_ORIGINS = ["http://localhost:5173", "http://localhost:3000"];

const ACCESS_TOKEN_OPTIONS = {
  expiresIn: 60,
};

const REFRESH_TOKEN_OPTIONS = {
  expiresIn: 60 * 2,
};

module.exports = {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  ALLOW_ORIGINS,
  ACCESS_TOKEN_OPTIONS,
  REFRESH_TOKEN_OPTIONS,
};
