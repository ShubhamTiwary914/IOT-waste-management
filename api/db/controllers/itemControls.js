const itemQueueModel = require('./../schema/ItemQueue').itemQueue_model
const hourStatsModel = require('./../schema/HourStats').hourStatsModel
const DeviceModel = require('./../schema/Device').DeviceModel
const axios = require('axios')


const treshold = 10
const predictPATH = 'http://127.0.0.1:8080/temp/'

async function createItemQueue(device_id){
    itemQueueModel.find({
        device_id: device_id
    }).then(result=>{
        if(result.length <= 0){
            new itemQueueModel({
                device_id: device_id,
                containers: [[],[]]
            }).save()
        }
    })
}


async function updateItemQueues_hourly(device_id, currentTime) {
    await createItemQueue(device_id);

    try {
        let queue = await itemQueueModel.find({ device_id: device_id });
        let hours = await hourStatsModel.find({ device_id: device_id });
        let deviceDat = await DeviceModel.find({ _id: device_id });

        let itemNames = deviceDat[0].itemNames;
        let queueContainers = queue[0].containers;
        let statsLen = hours[0].stats.length;
        let hourData = hours[0].stats[statsLen - 1].data;

        for (let i = 0; i < queueContainers.length; i++) {
            try {
                // If queue length == 0 -> put data from hourly to here[first hour]
                if (queueContainers[i].length <= 0) {
                    let resp = await axios.post(predictPATH, { item: itemNames[i], temp: hourData.temp});
                    queueContainers[i].push({
                        itemName: itemNames[i],
                        time: currentTime,
                        weight: hourData.containers[i].weight,
                        prediction: resp.data.output
                    });
                }
                // If queue length > 0 -> compare queue front with current hour added data
                else{
                    let summ = 0;
                    for(let queueIndex=0; queueIndex<queueContainers[i].length; queueIndex++){
                        summ += queueContainers[i][queueIndex].weight
                    }
                    let diff = hourData.containers[i].weight - summ;
                    //console.log(diff)
                    // if  diff >= treshold[increased] -> add difference of item to queue (back)
                    if(diff >= treshold){
                        let resp = await axios.post(predictPATH, { item: itemNames[i], temp: hourData.temp });
                        queueContainers[i].push({
                            itemName: itemNames[i],
                            time: currentTime,
                            weight: diff,
                            prediction: resp.data.output
                        })
                    }
                    // if diff < -treshold[decreased] -> remove difference from front
                    if(diff <= -treshold){
                        diff = - diff
                        let k = 0;
                        while(diff > 0){
                            //ends as diff is over
                            if(queueContainers[i][k].weight == diff){
                                queueContainers[i].shift();
                                break;
                            }
                            else if(diff > queueContainers[i][k].weight){
                                diff -= queueContainers[i][k].weight;
                                queueContainers[i].shift();
                                k++;
                            }else{
                                queueContainers[i][k].weight -= diff;
                                break;
                            }
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        //end of iteration W
        await itemQueueModel.findOneAndUpdate(
            { device_id: device_id },
            { containers: queueContainers }
        )
        console.log("Item Queue sucessfully updated!")

    } catch (error) {
        console.error("Error occurred:", error);
    }
}


module.exports = {
    updateItemQueues_hourly,
}