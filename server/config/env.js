module.exports = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/job-board",
  PORT: process.env.PORT ?? 5001,

  JWT_SECRET: process.env.JWT_SECRET ?? "secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "90d",

  EMAIL_USERNAME: process.env.EMAIL_USERNAME ?? "",
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ?? "",
  FRONTEND_URL: process.env.FRONTEND_URL ?? "http://localhost:3000",
};
