import os
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq

from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

class qa_generator_gen_ai:
    def __init__(self):
        
       # Get Groq API key
       self.groq_api_key = os.environ['GROQ_API_KEY']
       self.model = 'mixtral-8x7b-32768'
    
    def question_generator(self,job_profile,prompt,questions_gen_ai,number_of_questions_levelwise): 

        # Initialize Groq Langchain chat object and conversation
        groq_chat = ChatGroq(
           groq_api_key=self.groq_api_key, 
            model_name=self.model
        )

    
    
        # Create a conversation chain using the LangChain LLM (Language Learning Model)
        parser = StrOutputParser()

        # chain = prompt | model | output_parser
    
        conversation = LLMChain(
                llm=groq_chat,  # The Groq LangChain chat object initialized earlier.
                prompt=prompt,  # The constructed prompt template.
                output_parser=parser  # TRUE Enables verbose output, which can be useful for debugging.
         )
            # The chatbot's answer is generated by sending the full prompt to the Groq API.
    
        response = conversation.invoke({'number_of_questions':{questions_gen_ai},'job_profile':{job_profile},'easy':{number_of_questions_levelwise[0]},'medium':{number_of_questions_levelwise[1]},'hard':{number_of_questions_levelwise[2]},'very_hard':{number_of_questions_levelwise[3]}})
        
        return response['text']

