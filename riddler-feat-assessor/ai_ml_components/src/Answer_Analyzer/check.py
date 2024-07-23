from sentence_transformers import SentenceTransformer, util


# multi-qa-mpnet-base-cos-v1
# multi-qa-MiniLM-L6-cos-v1

model = SentenceTransformer("multi-qa-mpnet-base-cos-v1")

query_embedding = model.encode("""Cross-validation is a technique used to evaluate 
                               the performance of machine learning models and prevent 
                               overfitting. It involves dividing the data into k folds,
                               where k-1 folds are used for training and one fold is 
                               used for testing. This process is repeated k times, 
                               and the average performance is calculated. 
                               Cross-validation is important because it provides a 
                               more reliable estimate of the model's performance than
                                using a single train-test split. It also helps in 
                               hyperparameter tuning by providing a more robust 
                               estimate of the model's performance.""")

passage_embedding = model.encode("""Cross-validation tests models with 
                                  k-folds; refines hyperparameters 
    and ensures accurate performance estimates""")



# passage_embedding = model.encode("""Machine learning imitates humans""")

#passage_embedding = model.encode("""My name is Praveen""")

#passage_embedding = model.encode("""Cross valination""") 

print(len(query_embedding))
print(len(passage_embedding))

print("Similarity:", util.dot_score(query_embedding, passage_embedding))