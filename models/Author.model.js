
const {Schema, model} = require('mongoose')

const authorSchema = new Schema (
    {
        name: String,
        age: Number,
        Country: String,
    }
)

const Author = model("Author", authorSchema)

module.exports = Author