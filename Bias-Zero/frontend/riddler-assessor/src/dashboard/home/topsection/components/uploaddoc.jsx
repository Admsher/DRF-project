import React, { useState } from 'react';
import PdfPreview from './pdfpreview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadDoc() {
  const [view, setView] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [uploadFile, setUploadFile] = useState(false);
  const [uploadUrl, setUploadUrl] = useState(false);
  const [choice, setChoice] = useState(true);
  const [fileType, setFileType] = useState("");
  const [fileInfo, setFileInfo] = useState({});
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const navigate = useNavigate();

  const [recentFiles, setRecentFiles] = useState(() => {
    const savedFiles = localStorage.getItem('recentFiles');
    try {
      return JSON.parse(savedFiles) || [];
    } catch (error) {
      return [];
    }
  });

  const toggle = () => {
    setView(!view);
  };

  const handleQSubmit = () => {
    console.log(recentFiles);
    localStorage.setItem('recentFiles', JSON.stringify(recentFiles));
    navigate('/message');
  };

  const handleFileChange = (e) => {
    const temp = e.target.files[0];
    if (temp.type === "application/pdf") {
      setFile(temp);
      setFileType('pdf');
    } else if (temp.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      setFile(temp);
      setFileType('docx');
    } else {
      alert("Upload pdf or docx format files");
      return;
    }

    const uploadDate = new Date();
    const currFileInfo = {
      name: temp.name,
      type: temp.type,
      size: (temp.size / 1024).toFixed(2), // size in KB
      date: uploadDate.toLocaleDateString(),
      time: uploadDate.toLocaleTimeString(),
    };
    setFileInfo(currFileInfo);
    setRecentFiles([currFileInfo, ...recentFiles]);

    // Clear previous messages and data
    setMessage('');
    setQuestionAnswers([]);
    setError('');
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('uploadUrl', uploadUrl);
    formData.append('pdf', true);
    formData.append('url', false);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/pdfs/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded successfully!');
      console.log('File uploaded successfully:', response.data);

      // After successful upload, fetch question and answers
      fetchQuestionAnswers();
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data}`);
        console.error('Response error:', error.response.data);
      } else if (error.request) {
        setMessage('Error: No response from the server.');
        console.error('Request error:', error.request);
      } else {
        setMessage(`Error: ${error.message}`);
        console.error('Error:', error.message);
      }
    }
  };

  const fetchQuestionAnswers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/assessor/save-qa');
      const qaData = response.data;
      const formattedQA = Object.keys(qaData).map(key => ({
        question: qaData[key].question,
        answer: qaData[key].answer,
        difficulty: qaData[key].difficulty
      }));
      setQuestionAnswers(formattedQA);
      console.log('Qa get successfully:', formattedQA);
    } catch (error) {
      setError('Failed to fetch question answers.');
      console.error('Fetch error:', error);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    console.log(url);
  };

  return (
    <div className='bg-ltblue m-4 h-[90%] w-1/3 rounded-md flex flex-col'>
      {/* Upload pop up */}
      {view && (
        <div className='text-black absolute bg-mdblue w-3/5 h-5/6 p-2 rounded-lg top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 border-4 border-dkblue'>
          {/* Heading */}
          <div className='flex p-3 text-white'>
            <button
              className='px-3 rounded-md bg-white text-black text-xl'
              onClick={() => {
                setChoice(true);
                setUploadFile(false);
                setUploadUrl(false);
                setFile(null);
                setFileInfo({});
              }}
            >
              {"<"}
            </button>
            <h2 className='w-[98%] text-center text-lg'>Upload Document</h2>
            <button
              className='text-end px-3 bg-white text-black rounded-md'
              onClick={toggle}
            >
              X
            </button>
          </div>
          {/* Content Inside */}
          <div className='border-dashed border-ltgray border-2 h-[90%]'>
            {/* Upload container */}
            {uploadFile && (
              <div>
                {/* File Input */}
                <div className='flex flex-col items-center p-5 text-white'>
                  <form onSubmit={handleFileUpload}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" className='px-3 py-1 bg-white text-black rounded-md mt-2'>
                      Submit
                    </button>
                  </form>
                  {message && <p>{message}</p>}
                </div>
                {/* File Preview */}
                <div className='h-[600px] m-1 flex flex-wrap'>
                  {/* preview */}
                  <div className='h-[430px] w-1/2 overflow-hidden flex items-center justify-center'>
                    <div className='h-full w-fit'>
                      {fileType === 'pdf' && file && <PdfPreview pdfUrl={URL.createObjectURL(file)} />}
                      {fileType === 'docx' && file && <PdfPreview pdfUrl={URL.createObjectURL(file)} />}
                    </div>
                  </div>
                  {/* File Info */}
                  <div className='w-1/2 text-white'>
                    <h2 className='font-bold'>File Information</h2>
                    <div className='text-start p-4'>
                      {file && (
                        <div className="mt-4 space-y-20">
                          <div>
                            <p><strong>File Name:</strong> {fileInfo.name}</p>
                            <p><strong>File Size:</strong> {fileInfo.size} KB</p>
                            <p><strong>Upload Date:</strong> {fileInfo.date}</p>
                            <p><strong>Upload Time:</strong> {fileInfo.time}</p>
                          </div>
                          <div className='flex items-center justify-center'>
                            <button
                              onClick={handleQSubmit}
                              className='p-3 bg-white text-black rounded-md'
                            >
                              Generate Questions
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {questionAnswers.length > 0 && (
                  <div className='w-full text-white'>
                    <h2 className='font-bold'>Questions and Answers</h2>
                    <ul>
                      {questionAnswers.map((qa, index) => (
                        <li key={index} className='mb-4'>
                          <strong>Q: {qa.question}</strong>
                          <br />
                          A: {qa.answer}
                          <br />
                          <em>Difficulty: {qa.difficulty}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            {/* Upload url */}
            {uploadUrl && (
              <div>
                {/* Url Input */}
                <div className='flex flex-col items-center p-5 text-white'>
                  <form onSubmit={handleUrlSubmit} className='space-x-5'>
                    <input
                      type="text"
                      value={url}
                      onChange={handleUrlChange}
                      className='text-black bg-white'
                      placeholder='Enter Docx url'
                    />
                    <button className='px-2 bg-white text-black rounded-md'>Upload URL</button>
                  </form>
                  {error && <p>{error}</p>}
                </div>
                {/* file preview */}
              </div>
            )}
            {/* Choice to choose upload url or file */}
            {choice && (
              <div className='p-10 h-3/4 flex items-center justify-center flex-col'>
                <button
                  className='p-3 bg-white rounded-md'
                  onClick={() => {
                    setUploadFile(!uploadFile);
                    setChoice(!choice);
                  }}
                >
                  Upload File
                </button>
                <div className='text-white'>or</div>
                <button
                  className='p-3 bg-white rounded-md'
                  onClick={() => {
                    setUploadUrl(!uploadUrl);
                    setChoice(!choice);
                  }}
                >
                  Upload URL
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Top section upload box */}
      <h2 className='w-full text-start text-xl p-5 pt-3'>Upload File</h2>
      <div className='w-full flex items-center justify-center'>
        <div
          className='text-base bg-ltgray text-black font-light px-8 py-1 rounded-md text-center pb-4 cursor-pointer'
          onClick={toggle}
          type="button"
        >
          <div className='text-4xl'>+</div>
          <p>Upload Document</p>
        </div>
      </div>
    </div>
  );
}

export default UploadDoc;