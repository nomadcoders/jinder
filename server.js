const Hapi = require("hapi");

const server = new Hapi.Server({ port: 3000, host: "localhost" });

async function start() {
  try {
    await server.start();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  console.log("Server running at:", server.info.uri);
}

start();
