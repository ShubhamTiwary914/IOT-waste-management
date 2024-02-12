from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import warnings

warnings.filterwarnings("ignore")
model = joblib.load('./model/new_model.pkl');

app = FastAPI();
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)



class ReqBody(BaseModel):
    item: str
    temp: float




def predictor(foodItem: str, temp: float):
    testFd = pd.DataFrame([[foodItem, temp]], columns=["Food Item", "Temp.(in degree C)"])
    preds = model.predict(testFd)
    return preds[0];


@app.post('/temp/')
async def postReq(request: ReqBody):
    preds = predictor(request.item, request.temp)
    return {
        "success": True,
        "output": preds
    }






