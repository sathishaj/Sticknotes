const mongoose = require("mongoose")

const NotesSchema = new mongoose.Schema({
    Title : String,
    Description : String,
    Date: { type: Date, default: Date.now },
    Color : String,
})

module.exports = mongoose.model("Notes", NotesSchema)