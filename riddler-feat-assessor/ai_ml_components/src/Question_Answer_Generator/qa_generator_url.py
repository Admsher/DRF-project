from functools import cache
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import re
import pandas as pd

os.environ['GROQ_API_KEY']="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"


class qa_generator_url:
    def __init__(self, url: str, n_href: int,prompt_template):
        self.url = url
        self.n_href = n_href
        self.prompt_template=prompt_template
        self.llm_model=ChatGroq(model="llama3-8b-8192", temperature=0)
        # self.GROQ_API_KEY=groq_api_key

    @cache
    def get_website_content(self, url, n_href=None, visited=None):
        if visited is None:
            visited = set()

        try:
            # Fetch the HTML content of the current page
            response = requests.get(url)
            response.raise_for_status()

            # Parse HTML content using BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Extract text content from the current page
            content = soup.get_text()

            # Add current page to visited set
            visited.add(url)

            if n_href is not None:
                # Find all links on the page
                links = soup.find_all('a', href=True)[:n_href]

                # Follow each link and recursively get content
                for link in links:
                    next_url = urljoin(url, link['href'])
                    if next_url not in visited:
                        content += self.get_website_content(next_url, n_href, visited)

            return content

        except Exception as e:
            print("Error:", e)
            return ""
    
    def generate_questions(self,questions_url,number_of_questions_levelwise):
        try:
            #Parsing the content from the given url
            content=self.get_website_content(self.url,self.n_href)

            #Create the OutPut Parser Object()
            output_parser=StrOutputParser()

            # Creating the Conversation History

            conv_his=[]

            # prompt_template=ChatPromptTemplate.from_messages(
            # [
            # ("system",f"Message:{self.prompt_message}"),
            # ("user","Content:{data}"),
            # ]
            # )


            # Create the Chain for our LLM
            # chain=prompt_template|self.llm_model|output_parser

            # prompt = ChatPromptTemplate.from_template("Generate 10 questions  from given {data}")
            chain = self.prompt_template |self.llm_model|output_parser

            #ques = chain.invoke({"prompt": prompt_template, "data": content, "conv_history": conv_his})
            
            response=chain.invoke({"job_profile": "Data Scientist","questions_url":questions_url,"data":content,"easy":number_of_questions_levelwise[0],"medium":number_of_questions_levelwise[1],"hard":number_of_questions_levelwise[2],"veryhard":number_of_questions_levelwise[3],})
            return response
        
        except Exception as e:
            print("Error:", e)
            return ""








    # def to_csv(self,output_file_name: str):
    #     text=self.generate_questions()

    #     try:
    #         # Regular expressions to identify questions and answers
    #         question_pattern = re.compile(r'(\d+)\.\s(.*?)(?=Answer:)', re.DOTALL)
    #         answer_pattern = re.compile(r'Answer:\s(.*?)(?=\d+\.\s|$)', re.DOTALL)

    #         # Extract questions and answers
    #         questions = question_pattern.findall(text)
    #         answers = answer_pattern.findall(text)

    #         # Levels based on the question numbers
    #         levels = ['Easy'] * 5 + ['Medium'] * 5 + ['Hard'] * 5 + ['Very Hard'] * 5

    #         # Create the content as a list of dictionaries
    #         content = []
    #         for i, (level, (num, question), answer) in enumerate(zip(levels, questions, answers)):
    #             content.append({
    #                 "Level": level,
    #                 "Question Number": int(num.strip()),
    #                 "Question": question.strip(),
    #                 "Answer": answer.strip()
    #             })

    #         # Create a DataFrame from the list of dictionaries
    #         df = pd.DataFrame(content)
    #         return df
            
            
    #     except Exception as e:
    #         print("Error:", e)
    #         return ""

