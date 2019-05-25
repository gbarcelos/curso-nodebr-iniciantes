const Mongoose = require('mongoose');

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    nascimento: {
        type: Date,
        default: new Date()
    },
});
module.exports = Mongoose.models.heroes || Mongoose.model('heroes', heroiSchema);