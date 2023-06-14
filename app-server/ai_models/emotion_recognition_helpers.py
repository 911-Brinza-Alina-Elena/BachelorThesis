from transformers import DistilBertTokenizer, DistilBertModel
import re
import string
import torch
import joblib
import contractions

class EmotionRecognition:
    def __init__(self):
        self.tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-cased')
        self.bert_model = DistilBertModel.from_pretrained('distilbert-base-cased')
        self.svm_model = joblib.load('ai_models/model-4.pkl')
        self.emotions = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']

    def preprocess_text(self, text):
        text = re.sub(r"http\S+|www\S+|https\S+", "", text)
        # remove words like href, img, www, http, width, height, src
        text = re.sub(r"\S*(href|img|www|http|width|height|src)\S*", "", text)
        # remove contractions
        text = contractions.fix(text)
        # remove special characters
        text = text.translate(str.maketrans('', '', string.punctuation))

        encoded_input = self.tokenizer.encode_plus(
            text,
            add_special_tokens=False,
            max_length=512,
            padding='max_length',
            truncation=True,
            return_tensors='pt'
        )
        return encoded_input['input_ids'], encoded_input['attention_mask']

    def extract_features(self, inputs, masks):
        with torch.no_grad():
            outputs = self.bert_model(inputs, attention_mask=masks)
            pooled_output = outputs[0][:, 0, :]
        return pooled_output.numpy()

    def predict(self, text):
        inputs, masks = self.preprocess_text(text)
        features = self.extract_features(inputs, masks)
        prediction = self.svm_model.predict(features)
        return self.emotions[prediction[0]]