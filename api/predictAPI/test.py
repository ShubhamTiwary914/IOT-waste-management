import joblib
import warnings
warnings.filterwarnings("ignore")



model = joblib.load('./model/fsp_model.pkl');
prediction = model.predict([[23.5, 23,5]]);
print(prediction)
