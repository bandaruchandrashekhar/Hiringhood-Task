const mongoose = require("mongoose")

URI = process.env.MONGO_URI

module.exports = mongoose.connect(URI)
                            .then(()=>console.log("DB is connected successfully"))
                            .catch(err=>console.log(err))