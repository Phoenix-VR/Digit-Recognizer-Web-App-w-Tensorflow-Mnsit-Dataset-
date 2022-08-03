import cv2
from flask import Flask,request
from flask_cors import CORS
import base64
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

# Initializing model
model = tf.keras.models.load_model('model.h5')

@app.route('/',methods=['GET','POST'])
def predict():
    if request.method == 'POST':
        img = request.json['image']
        draw = img[22:]
        decoded = base64.b64decode(draw)
        arr = np.asarray(bytearray(decoded),'uint8')
        
        image = cv2.imdecode(arr,cv2.IMREAD_GRAYSCALE)
        resize = cv2.resize(image,(28,28),interpolation=cv2.INTER_AREA)
     
        arr = np.asarray(resize,dtype='uint8')
        predict_img = arr.reshape(1,784)
        prediction = model.predict(predict_img)
        digit = tf.math.argmax(prediction[0]).numpy()
        print(digit)
        return {'status':'success','prediction':int(digit)}
        #im.save('new.jpg', 'JPEG')
    return {'status':'success','prediction':8}


if __name__ == '__main__':
    app.run(debug=True)