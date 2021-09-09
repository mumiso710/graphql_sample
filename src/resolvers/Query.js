
function feed_serviceA(parent, args, context, info) {
    return context.clientA.link.findMany()
  }

function feed_serviceB(parent, args, context, info) {
    return context.clientB.link.findMany()
  }

function feed_redis(parent, args, context, info) {
    return new Promise((resolve, rej) => {
        context.redisClient.get(args.key, (err, reply) => {
            resolve(reply);
        });
    }) 
}

function info () {
    return 'This is test app';
}

function weather() {
 
    let axios = require('axios')
    let appID = ''
    let weatherURL = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=' + appID + '&units=metric'
    let city = 'Japan'
    let requestURL = weatherURL + '&q=' + city;
    let data = (async () => {
        try {
            const response = await axios.get(requestURL);
            console.log(response.data.list[0].main.temp);
            return String(response.data.list[0].main.temp);
        } catch (error) {
            console.log(error);
        }
    })();
    return data;

    
}

  module.exports = {
    feed_serviceA,
    feed_serviceB,
    feed_redis,
    info,
    weather,
  }