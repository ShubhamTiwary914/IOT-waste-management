import joblib
import warnings
warnings.filterwarnings("ignore")



model = joblib.load('./model/fsp_model.pkl');
prediction = model.predict([[2, 23,5]]);
print(prediction)
