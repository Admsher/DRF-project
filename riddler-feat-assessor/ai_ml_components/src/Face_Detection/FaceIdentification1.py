import cv2
import dlib
import face_recognition

class FaceRecognizer:

    # A class for performing real-time face recognition using webcam.


    def __init__(self, known_image_path, predictor_path="shape_predictor_68_face_landmarks.dat"):
        """
        Initialize the FaceRecognizer with known face image and shape predictor path.

        Args:
            known_image_path (str): Path to the image of the known person.
            predictor_path (str): Path to the shape predictor file (default is "shape_predictor_68_face_landmarks.dat").
        """
        self.known_encoding = None
        self.predictor = dlib.shape_predictor(predictor_path)
        self.load_known_face_encoding(known_image_path)
        self.cap = cv2.VideoCapture(1)

    def load_known_face_encoding(self, known_image_path):
        """
        Load the known face image and compute its encoding.

        Args:
            known_image_path (str): Path to the image of the known person.
        """
        known_image = face_recognition.load_image_file(known_image_path)
        self.known_encoding = face_recognition.face_encodings(known_image)[0]

    def recognize_faces(self):
        """
        Perform face recognition in real-time using webcam.
        """
        while True:
            ret, frame = self.cap.read()
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

            face_locations = face_recognition.face_locations(rgb_frame)
            face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

            for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
                matches = face_recognition.compare_faces([self.known_encoding], face_encoding)
                label = "Known Person" if matches[0] else "Unknown"
                color = (0, 255, 0) if matches[0] else (0, 0, 255)

                cv2.rectangle(frame, (left, top), (right, bottom), color, 2)
                cv2.putText(frame, label, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            cv2.imshow("Face Recognition", frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    def release(self):
        """
        Release the webcam and close OpenCV windows.
        """
        self.cap.release()
        cv2.destroyAllWindows()

# Usage
if __name__ == "__main__":
    recognizer = FaceRecognizer("known_person.jpg")
    recognizer.recognize_faces()
    recognizer.release()
