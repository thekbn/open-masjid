const fastify = require('fastify')({ logger: true })
const route  = require('./routes')
import prismaPlugin from './plugins/prisma'

fastify.register(prismaPlugin)
fastify.register(route)

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()