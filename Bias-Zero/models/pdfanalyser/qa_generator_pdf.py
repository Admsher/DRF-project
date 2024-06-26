from llama_parse import LlamaParse
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings.fastembed import FastEmbedEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.document_loaders import UnstructuredMarkdownLoader
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA

from groq import Groq
from langchain_groq import ChatGroq


import joblib
import os

os.environ['TOKENIZERS_PARALLELISM'] = 'false'

class qa_generator_pdf:

    pass
    
    def __init__(self):
        pass

    def load_or_parse_data(self,llamaparse_api_key,path):
         data_file = "./data/parsed_data.pkl"

         if os.path.exists(data_file):
             # Load the parsed data from the file
             parsed_data = joblib.load(data_file)
         else:
             # Perform the parsing step and store the result in llama_parse_documents
             parsingInstruction = """ It contains tables.
             Try to be precise while generating the questions and answers. """
             parser = LlamaParse(api_key=llamaparse_api_key,
                            result_type="markdown",
                            parsing_instruction=parsingInstruction,
                            max_timeout=10000,)
             llama_parse_documents = parser.load_data(path)


             # Save the parsed data to a file
             print("Saving the parse results in .pkl format ..........")
             joblib.dump(llama_parse_documents, data_file)

             # Set the parsed data to the variable
             parsed_data = llama_parse_documents

         return parsed_data
    

    # Create vector database
    def create_vector_database(self,llama_parse_documents):
         """
         Creates a vector database using document loaders and embeddings.

         This function loads pdfs,
         splits the loaded documents into chunks, transforms them into embeddings using OllamaEmbeddings,
         and finally persists the embeddings into a Chroma vector database.

         """
         # To fetch the parsed data
         llama_parse_documents = llama_parse_documents
       

         with open('data/output.md', 'a') as f:  # Open the file in append mode ('a')
            for doc in llama_parse_documents:
               f.write(doc.text + '\n')

         markdown_path = "data/output.md"
         loader = UnstructuredMarkdownLoader(markdown_path)

         #loader = DirectoryLoader('data/', glob="**/*.md", show_progress=True)
         documents = loader.load()
         
         # Split loaded documents into chunks
         text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
         docs = text_splitter.split_documents(documents)

         #len(docs)
         print(f"length of documents loaded: {len(documents)}")
         print(f"total number of document chunks generated :{len(docs)}")
         
         #docs[0]

         # Initialize Embeddings
         #BAAI/bge-base-en
         #BAAI/bge-small-en-v1.5
         #BAAI/bge-small-en

         embed_model = FastEmbedEmbeddings(model_name="BAAI/bge-small-en")

          
         # Create and persist a Chroma vector database from the chunked documents
         
         directory_path = "chroma_db_llamaparse1"
         if not os.path.exists(directory_path):
   
             vs = Chroma.from_documents(
              documents=docs,
              embedding=embed_model,
              persist_directory="chroma_db_llamaparse1",  # Local mode with in-memory storage only
              collection_name="rag"
              )


         print('Vector DB created successfully !')
         return embed_model
    
    def chat_model(self,groq_api_key):
        chat_model = ChatGroq(temperature=0.0,
                      model_name="mixtral-8x7b-32768",
                      api_key=groq_api_key)
        
        return chat_model
    
    def vectorstore(self,embed_model):
        vectorstore = Chroma(embedding_function=embed_model,
                      persist_directory="chroma_db_llamaparse1",
                      collection_name="rag")

        retriever=vectorstore.as_retriever(search_kwargs={'k': 3})

        return retriever

   
    
    def output_generator(self,chat_model,retriever,prompt,query):
        qa = RetrievalQA.from_chain_type(llm=chat_model,
                               chain_type="stuff",
                               retriever=retriever,
                               return_source_documents=False,
                               chain_type_kwargs={"prompt": prompt})
        
        response = qa.invoke({
             "query":query
            })
        
        
        return response['result']
        
        