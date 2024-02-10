from fastapi import FastAPI
from pydantic import BaseModel
import joblib


class ReqBody(BaseModel):
    temp: float

app = FastAPI();


@app.post('/temp/')
async def postReq(request: ReqBody):
    model = joblib.load('./model/fsp_model.pkl');
    prediction = model.predict([[request.temp]])[0];
    print(prediction)

    return {
        "success": True,
        "output": ""
    }






