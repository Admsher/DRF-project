# Bias Zero - An Interview Bot
==============================

The Bias Zero - Interview Bot,Project is an innovative application that 
leverages artificial intelligence (AI) technologies to assist in conducting 
and analyzing job interviews. With the aim of streamlining the interview 
process and enhancing candidate evaluation, this project offers a 
comprehensive suite of features designed to support recruiters, 
interviewers, and candidates throughout the interview lifecycle.


## OVERVIEW
------------

Bias Zero automates the screening round interview process, enabling 
recruiters and hiring managers to efficiently assess candidate suitability 
for positions while promoting fairness, objectivity, and diversity in the 
evaluation process. Key components include:

**Resume Screening**: Utilize natural language processing (NLP) algorithms to 
analyze candidate resumes and identify relevant skills, experiences, 
and qualifications.

**Question Answer Generator**: Generate interview questions using LLMs based on candidate profiles and job requirements, ensuring relevance and coverage of key topics.

**Answer Analyzer**: Employ large language models (LLMs) to analyze candidate 
responses during interviews, generating comprehensive reports on content, 
coherence, and relevance.

**Confidence Level Detection**: Utilize voice and image analysis techniques to detect candidate confidence levels during interviews.

**Eye Ball Tracking**: Monitor candidate's eye movements during interviews to 
assess engagement, attention, and focus.

**Face Detection**: Identify and authenticate candidates using facial 
recognition technology, ensuring interview integrity and preventing 
impersonation.

**NLP** : Enable text-to-speech and speech-to-text capabilities for seamless 
communication and interaction between candidates and interviewers. This
component will generate interview transcripts for analysis.

**Nervousness Detection**: Utilize image analysis to detect candidate 
nervousness levels.


## Project Organization

------------
```
.
├── LICENSE
├── Makefile        <- Makefile with commands like `make data` or `make train`
├── README.md       <- The top-level README for developers using this 
 project.
├── data            <- Dataset for each model/component
│   ├── Confidence_Level_Detection
│   │   ├── processed         <- The final data sets for modeling.
│   │   └── raw               <- The original data dump.
│   ├── Eye_Ball_Tracking
│   │   ├── processed         
│   │   └── raw               
│   ├── Face_Detection
│   │   ├── processed
│   │   └── raw
│   └── Nervousness_Detection
│       ├── processed
│       └── raw
├── docs        <- Documentaion for each component
|
├── models      <- Trained and serialized models
|
├── notebooks   <-Jupyter notebooks
|
├── references  <- Data dictionaries, manuals, and all other explanatory 
materials.
|
├── reports     <-Generated analysis of the models
│   └── figures
|
├── requirements.txt  <- The requirements file for reproducing the analysis 
environment
|
├── setup.py     <- makes project pip installable
|
├── src      <- Source code for each component
│   ├── Answer_Analyzer
│   ├── Confidence_Level_Detection
│   ├── Eye_Ball_Tracking
│   ├── Face_Detection
│   ├── NLP
│   ├── Nervousness_Detection
│   ├── Question_Answer_Generator
│   ├── Resume_Screening
│   └── __init.py__     <- Makes src a Python module
|
├── test_environment.py  <-- test the environment for the dependencies


```
## LICENSE
------------

