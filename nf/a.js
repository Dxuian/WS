// const pino = require('pino-pretty')
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: "reqId,responseTime,req"
    }
  }
})


const fastify = require('fastify')({
  logger: logger
  /*envToLogger[environment] ?? true // defaults to true if no entry matches in the map*/
})
const path = require('path')

 global.app  = fastify.register(require("fastify-sqlite"),{
  promiseApi: true, 
  dbFile: 'foo.db',
  verbose: true
})



// fastify.register(require('fastify-sqlite'),{
//   filename: './mydatabase.db',
//   driver: require('sqlite3'),
//   verbose: true
// })
fastify.register(require('@fastify/cookie'), {
  secret: "my-secret", // for cookies signature
  hook: 'onRequest', // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}  // options for parsing cookies
})

fastify.register(require('@fastify/swagger'), {})
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  uiHooks: {
    onRequest: function (request, reply, next) { next() },
    preHandler: function (request, reply, next) { next() }
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
  transformSpecificationClone: true
})
var data = require("./data.js");
const config = {
  babelrc: {
    presets: ["@babel/preset-env", "@babel/preset-react"],
    extensions: ['js', 'jsx'],
    plugins: ['bare-import-rewrite'],
  }
};
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})
.register(require('@fastify/static'), {
  root: path.join(__dirname, 'node_modules'),
  prefix: '/node_modules',
  decorateReply: false,
})
.register(require('fastify-babel'), {
  babelrc: config
})

// fastify.register(async function (fastify) {
//   fastify.get('/ws', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//     connection.socket.on('message', message => {
//       // message.toString() === 'hi from client'
//       connection.socket.send('hi from server')
//     })
//   })
// })
// require('@babel/register')({
//   ignore: [/\/(build|node_modules)\//],
//   presets: ['@babel/preset-react']
// });





fastify.register(require('@fastify/websocket'), {
  options: { maxPayload: 1048576 }
})
fastify.register(require("./route.js"));



const PORT = 5000;
var start = async () => {
  try {
    await fastify.listen({ port: PORT })
    fastify.log.info("hello");
    await app.ready() ;
  
    
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)

  }
}
start()

