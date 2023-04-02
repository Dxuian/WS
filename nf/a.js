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
const path = require('path')
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

// fastify.register(async function (fastify) {
//   fastify.get('/ws', { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
//     connection.socket.on('message', message => {
//       // message.toString() === 'hi from client'
//       connection.socket.send('hi from server')
//     })
//   })
// })
fastify.register(require("./route.js"));
fastify.register(require('@fastify/websocket'), {
  options: { maxPayload: 1048576 }
})


const PORT = 5000;
var start = async () => {
  try {
    await fastify.listen({ port: PORT })
    fastify.log.info("hello");
  } catch (error) {
    fastify.log.error(error)
    process.exit(1)

  }
}
start()
