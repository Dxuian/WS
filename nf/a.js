// const pino = require('pino-pretty')
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: "reqId,responseTime"
    }

  }
})
const fastify = require('fastify')({
  logger: logger
  /*envToLogger[environment] ?? true // defaults to true if no entry matches in the map*/
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
fastify.register(require("./route.js"));
var data = require("./data.js");



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
