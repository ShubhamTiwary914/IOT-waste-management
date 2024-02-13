const mongoose  = require('mongoose')

const itemQueue_schema = new mongoose.Schema({
    device_id: mongoose.SchemaTypes.ObjectId,
    containers: [
        [
            {
                itemName: String,
                addDate: {
                    type: Date,
                    default: ()=> Date.now()
                },
                time: String,
                weight: Number,
                prediction: Number
            }
        ]
    ]
})


const itemQueue_model = new mongoose.model('itemQueue', itemQueue_schema)
module.exports = {
    itemQueue_schema,
    itemQueue_model
}   

