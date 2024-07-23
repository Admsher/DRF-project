import json
from sentence_transformers import SentenceTransformer, util

class answer_analyzer:
    def __init__(self, questions_file_path):
        self.questions = self.load_questions(questions_file_path)
        self.model = SentenceTransformer("multi-qa-MiniLM-L6-cos-v1")

    def load_questions(self, file_path):
        with open(file_path, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        return questions

    def assign_score(self,similarity):
         if similarity > 0.8:
            return 5  # High score
         elif similarity > 0.6:
             return 4
         elif similarity > 0.4:
             return 3
         elif similarity > 0.2:
             return 2
         else:
            return 1  # Low score
         
    def score_answer(self, question_id, interviewee_answer):
        if question_id not in self.questions:
            print(f"Question with ID '{question_id}' not found.")
            return None
        
        question=self.questions[question_id]['question']
        answer = self.questions[question_id]['answer']

        print(question)
        print()
        print(answer)
        print()
        
        print(interviewee_answer)
        print()
           
        # Encode  answer
        
        answer_embedding = self.model.encode(answer)
        interviewee_answer_embedding = self.model.encode(interviewee_answer)
     

        # Calculate similarity scores
       
        answer_similarity = util.dot_score(answer_embedding, interviewee_answer_embedding)
        
        score=self.assign_score(answer_similarity)

        print(f"score: {score} ")
        print("\n\n\n")
        return score

    def process_interview(self, interview_file_path):
        with open(interview_file_path, 'r', encoding='utf-8') as f:
            interview_data = json.load(f)

        total_score = 0.0
        for question_id, interviewee_answer in interview_data.items():
            score = self.score_answer(question_id, interviewee_answer)
            if score is not None:
                total_score += score
        
        return total_score



