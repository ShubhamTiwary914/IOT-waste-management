const express = require('express')
const predictionRouter = express.Router();
const { InferenceSession, Tensor } = require('onnxruntime-node');



async function predictSpoilage(temp, responder){
    // Create a new InferenceSession
    const session = new InferenceSession();

    // Load the ONNX model
    await session.loadModel('./../../model/fsp_model.onnx');

    // Prepare input data (replace inputData with your actual input data)
    const inputData = new Float32Array([32.65]);

    // Create an input Tensor
    const inputTensor = new Tensor('float32', inputData, [1, inputData.length]);

    // Run the model
    const outputMap = await session.run([inputTensor]);

    // Get the output tensor
    const outputTensor = outputMap.values().next().value;

    // Access the predictions
    const predictions = outputTensor.data;
    console.log(predictions);
}


predictionRouter.post('/predict/', (req,res)=>{
    const temp = req.body.temp;
    predictSpoilage(temp, res)
})



module.exports = predictionRouter;