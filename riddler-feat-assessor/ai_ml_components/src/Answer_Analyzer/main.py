from answer_analyzer import answer_analyzer

aan_obj = answer_analyzer("database_qa.json")

interview_score = aan_obj.process_interview("transcript_set1.json")

print(f"Total interview score: {interview_score}")
