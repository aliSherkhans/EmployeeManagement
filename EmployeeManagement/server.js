const app = require("./app");
const config = require("./config");

process.on("uncaughtException", (error) => {
  console.log(error.name, error.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

app.listen(config.PORT, config.IP, () =>
  console.log(`Server start at port ${config.PORT}`)
);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  console.log("unhandled Rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
