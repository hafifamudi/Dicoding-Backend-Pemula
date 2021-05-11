const hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();

  return server;
};

init()
.then(server => {
    console.log(`Server sudah berjalan di ${server.info.uri}`);
})
.catch(error => {
    console.log(error);
})
