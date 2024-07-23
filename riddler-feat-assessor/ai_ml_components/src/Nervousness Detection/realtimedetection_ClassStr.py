import cv2
from tensorflow.keras.models import model_from_json
import numpy as np


class EmotionDetector:
    def __init__(self, model_json_path, model_weights_path, haarcascade_path):
        self.model = self.load_model(model_json_path, model_weights_path)
        self.face_cascade = cv2.CascadeClassifier(haarcascade_path)
        self.labels = {0: 'confident', 1: 'Nervous'}

    def load_model(self, model_json_path, model_weights_path):
        with open(model_json_path, "r") as json_file:
            model_json = json_file.read()
        model = model_from_json(model_json)
        model.load_weights(model_weights_path)
        return model

    def extract_features(self, image):
        feature = np.array(image)
        feature = feature.reshape(1, 48, 48, 1)
        return feature / 255.0

    def detect_emotions(self):
        webcam = cv2.VideoCapture(1)

        while True:
            ret, frame = webcam.read()
            if not ret:
                break

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = self.face_cascade.detectMultiScale(gray, 1.3, 5)

            for (x, y, w, h) in faces:
                face_image = gray[y:y + h, x:x + w]
                cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)

                face_image = cv2.resize(face_image, (48, 48))
                img = self.extract_features(face_image)

                pred = self.model.predict(img)
                prediction_label = self.labels[np.argmax(pred)]

                cv2.putText(frame, prediction_label, (x, y - 10), cv2.FONT_HERSHEY_COMPLEX_SMALL, 2, (0, 0, 255), 2)

            cv2.imshow("Output", frame)

            if cv2.waitKey(27) & 0xFF == ord('q'):
                break

        webcam.release()
        cv2.destroyAllWindows()


if __name__ == "__main__":
    model_json_path = "emotiondetector.json"
    model_weights_path = "emotiondetector.h5"
    haarcascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'

    emotion_detector = EmotionDetector(model_json_path, model_weights_path, haarcascade_path)
    emotion_detector.detect_emotions()
