async function post_serviceA(parent, args, context, info) {
    return await context.clientA.link.create({
      data: {
        url: args.url,
        description: args.description,
      }
    })
  }

  async function post_serviceB(parent, args, context, info) {
    return await context.clientB.link.create({
      data: {
        url: args.url,
        description: args.description,
      }
    })
  }

  async function post_redis(parent, args, context, info) {
    
    return await context.redisClient.set(args.key, args.value)
}
  
  module.exports = {
    post_serviceA,
    post_serviceB,
    post_redis,
  }