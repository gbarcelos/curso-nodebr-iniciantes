const mongoS = require('./db/strategies/mongoDbStrategy')
const postgS = require('./db/strategies/postgresStrategy')
const Context = require('./db/strategies/base/contextStrategy');

const contextM = new Context( new mongoS())
console.log(contextM.create())

const contextP = new Context( new postgS())
console.log(contextP.create())