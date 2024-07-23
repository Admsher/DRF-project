import numpy as np
import librosa
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
import joblib

class AudioFeatureExtractor:
    def __init__(self, sr):
        self.sr = sr

    def extract_features(self, data):
        try:
            features = []

            # Feature 1: Speech rate (words per second)
            speech_rate = len(librosa.effects.split(data)) / librosa.get_duration(y=data)
            features.append(speech_rate)

            # Feature 2: Pitch variation (standard deviation of pitch)
            pitches, magnitudes = librosa.piptrack(y=data, sr=self.sr)
            pitch_std = np.std(pitches[pitches > 0])  # filtering out zero pitches if necessary
            features.append(pitch_std)

            # Feature 3: Energy (mean energy of the signal)
            energy = np.mean(librosa.feature.rms(y=data))
            features.append(energy)

            # Extract mean of the first 5 MFCCs
            mfccs = librosa.feature.mfcc(y=data, sr=self.sr, n_mfcc=12)
            mfccs_mean = np.mean(mfccs, axis=1)
            features.extend(mfccs_mean.tolist())

            # Feature 4: Zero Crossing Rate
            zcr = np.mean(librosa.feature.zero_crossing_rate(y=data))
            features.append(zcr)

            # Feature 5: Spectral Flux
            spectral_flux = np.mean(librosa.onset.onset_strength(y=data, sr=self.sr))
            features.append(spectral_flux)

            # Spectral Contrast
            spectral_contrast = librosa.feature.spectral_contrast(y=data, sr=self.sr)
            spectral_contrast_mean = np.mean(spectral_contrast, axis=1)
            features.extend(spectral_contrast_mean.tolist())

            # Harmonic-to-Noise Ratio (HNR)
            harmonic, percussive = librosa.effects.hpss(y=data)
            hnr = np.mean(librosa.feature.rms(y=harmonic) / (librosa.feature.rms(y=percussive) + 1e-6))
            features.append(hnr)

            # Spectral Roll-off
            spectral_rolloff_mean = np.mean(librosa.feature.spectral_rolloff(y=data, sr=self.sr))
            features.append(spectral_rolloff_mean)

            return np.array(features).reshape(1, -1)
        except Exception as e:
            print(f"Error processing audio file: {str(e)}")
            return np.array([]).reshape(1, -1)

class AudioClassifier:
    def __init__(self, model_path):
        self.load_model(model_path)

    def load_model(self, model_path):
        self.model, self.scaler = joblib.load(model_path)

    def predict(self, features):
        try:
            features_scaled = self.scaler.transform(features)
            prediction = self.model.predict(features_scaled)
            return prediction[0]
        except Exception as e:
            return f"Error predicting: {str(e)}"

class AudioProcessor:
    def __init__(self, model_path):
        self.classifier = AudioClassifier(model_path)

    def process_audio_file(self, file_path):
        try:
            # Load audio file
            data, sr = librosa.load(file_path, sr=None)

            # Extract features
            feature_extractor = AudioFeatureExtractor(sr=sr)
            features = feature_extractor.extract_features(data)

            if features.size == 0:
                return 'Error extracting features from audio file'

            # Removing 2 irrelevant features and 1 output label feature
            features = np.delete(features, [2, 12, -1], axis=1)

            # Predict using the classifier
            prediction = self.classifier.predict(features)
            return 'High Confidence' if prediction == 1 else 'Low Confidence'

        except Exception as e:
            return f"Error processing audio file: {str(e)}"
