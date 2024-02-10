import joblib

model = joblib.load('./model/fsp_model.pkl');
prediction = model.predict([[34.5]])[0];
print(prediction)
