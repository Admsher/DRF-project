import os
from confident_detection_helper import  AudioProcessor

def main(audio_file_path, model_path):
    if not os.path.isfile(audio_file_path):
        print(f"Error: File {audio_file_path} does not exist.")
        return

    # Initializing processor with the saved model
    processor = AudioProcessor(model_path)
    prediction = processor.process_audio_file(audio_file_path)
    print(f"Prediction: {prediction}")

# Example usage
if __name__ == "__main__":
    audio_file_path = 'ncf_10.wav'
    model_path = 'svm_model.joblib'
    main(audio_file_path, model_path)
