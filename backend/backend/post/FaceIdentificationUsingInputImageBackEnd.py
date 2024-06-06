import cv2
import dlib
import face_recognition

class FaceRecognizer:
    """
    A class for performing face recognition using a provided image.
    """

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

    def load_known_face_encoding(self, known_image_path):
        """
        Load the known face image and compute its encoding.

        Args:
            known_image_path (str): Path to the image of the known person.
        """
        known_image = face_recognition.load_image_file(known_image_path)
        self.known_encoding = face_recognition.face_encodings(known_image)[0]

    def recognize_faces(self, input_image_path):
        """
        Perform face recognition on the provided image.

        Args:
            input_image_path (str): Path to the input image.
        """
        input_image = face_recognition.load_image_file(input_image_path)
        rgb_image = cv2.cvtColor(input_image, cv2.COLOR_BGR2RGB)

        face_locations = face_recognition.face_locations(rgb_image)
        face_encodings = face_recognition.face_encodings(rgb_image, face_locations)

        for face_encoding in face_encodings:
            matches = face_recognition.compare_faces([self.known_encoding], face_encoding)
            label = "Known Person" if matches[0] else "Unknown"
            print("Recognition Result:", label)

# Usage
if __name__ == "__main__":
    recognizer = FaceRecognizer("known_person.jpg")
    input_image_path = "test_image.jpg"  # Change this to the path of your input image
    recognizer.recognize_faces(input_image_path)
