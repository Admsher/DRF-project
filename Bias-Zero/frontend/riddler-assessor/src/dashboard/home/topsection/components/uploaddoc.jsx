import React, { useState } from 'react';
import PdfPreview from './pdfpreview';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [recentFiles, setRecentFiles] = useState(() => {
    const savedFiles = localStorage.getItem('recentFiles');
    try {
      return JSON.parse(savedFiles) || [];
    } catch (error) {
      return [];
    }
  });

  const toggle = () => { setView(!view) };

  const handleQSubmit = () => {
    console.log(recentFiles);
    localStorage.setItem('recentFiles', JSON.stringify(recentFiles));
    navigate('/message');
  };

  const handleFile = (e) => {
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
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf_file', file); // Ensure the key matches the serializer field
    formData.append('source', 'file'); // Add an identifier

    try {
      const csrfToken = getCookie('csrftoken'); // Fetch CSRF token from cookie
      const response = await fetch('http://127.0.0.1:8000/assessor/save-qa/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken, // Include CSRF token in headers
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      setMessage('File uploaded successfully!');
      const responseData = await response.json();
      console.log('File uploaded successfully:', responseData);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error('Error:', error);
    }
  };

  const handleUrlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch the file from the URL.');
      }
      const blob = await response.blob();
      const tempFile = new File([blob], "downloadedFile", { type: blob.type });
      setFile(tempFile);
      setFileType(tempFile.type.includes('pdf') ? 'pdf' : 'docx');

      const uploadDate = new Date();
      const currFileInfo = {
        name: tempFile.name,
        type: tempFile.type,
        size: (tempFile.size / 1024).toFixed(2), // size in KB
        date: uploadDate.toLocaleDateString(),
        time: uploadDate.toLocaleTimeString(),
      };
      setFileInfo(currFileInfo);
      setRecentFiles([currFileInfo, ...recentFiles]);

      const formData = new FormData();
      formData.append('url_file', url); // Ensure the key matches the serializer field
      formData.append('source', 'url'); // Add an identifier

      const csrfToken = getCookie('csrftoken'); // Fetch CSRF token from cookie
      const uploadResponse = await fetch('http://127.0.0.1:8000/assessor/save-qa/', {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': csrfToken, // Include CSRF token in headers
        },
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(errorData.message || 'Something went wrong!');
      }

      setMessage('URL uploaded successfully!');
      const uploadResponseData = await uploadResponse.json();
      console.log('URL uploaded successfully:', uploadResponseData);
    } catch (error) {
      setError(`Error: ${error.message}`);
      console.error('Error:', error.message);
    }
  };

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
  };

  const handleSubmit = (e) => {
    if (uploadFile) {
      handleFileUpload(e);
    } else if (uploadUrl) {
      handleUrlSubmit(e);
    }
  };

  return (
    <div className='bg-ltblue m-4 h-[90%] w-1/3 rounded-md flex flex-col'>
      {/* Upload pop up */}
      {
        view &&
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
            >{"<"}</button>
            <h2 className='w-[98%] text-center text-lg'>Upload Document</h2>
            <button
              className='text-end px-3 bg-white text-black rounded-md'
              onClick={toggle}
            >X</button>
          </div>
          {/* Content Inside */}
          <div className='border-dashed border-ltgray border-2 h-[90%]'>
            {/* Upload container */}
            {
              uploadFile &&
              <div>
                {/* File Input */}
                <div className='flex flex-col items-center p-5 text-white'>
                  <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFile} />
                    <button type="submit" className='px-3 py-1 bg-white text-black rounded-md mt-2'>Submit</button>
                  </form>
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
                      {file &&
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
                            >Generate Questions</button>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
            {/* Upload url */}
            {
              uploadUrl &&
              <div>
                {/* Url Input */}
                <div className='flex flex-col items-center p-5 text-white'>
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder='Enter the url'
                      className='px-2 rounded-md text-black w-2/3 h-8'
                      onChange={(e) => setUrl(e.target.value)}
                    />
                    <button type="submit" className='px-3 py-1 bg-white text-black rounded-md mt-2'>Submit</button>
                  </form>
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
                      {file &&
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
                            >Generate Questions</button>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            }
            {/* Choose between url/file */}
            {
              choice &&
              <div className='flex flex-col items-center justify-center text-white'>
                <button
                  className='border-dashed border-2 border-ltgray w-2/3 h-20'
                  onClick={() => {
                    setUploadFile(true);
                    setChoice(false);
                    setUploadUrl(false);
                  }}
                >Upload file from the device</button>
                <div className='py-5'>or</div>
                <button
                  className='border-dashed border-2 border-ltgray w-2/3 h-20'
                  onClick={() => {
                    setUploadFile(false);
                    setChoice(false);
                    setUploadUrl(true);
                  }}
                >Upload file from the URL</button>
              </div>
            }
          </div>
        </div>
      }
      {/* Recent Files */}
      <div className='h-[50%] m-4 p-2 border-dashed border-4 border-ltgray overflow-y-auto'>
        <div className='font-bold'>Recent Files</div>
        <ul className='list-disc'>
          {recentFiles.map((file, index) => (
            <li key={index}>
              {file.name} ({file.size} KB) - {file.date} {file.time}
            </li>
          ))}
        </ul>
      </div>
      {/* Upload Button */}
      <div className='flex justify-center'>
        <button
          onClick={toggle}
          className='bg-dkblue text-white px-4 py-2 rounded-md'
        >Upload Document</button>
      </div>
    </div>
  );
}

export default UploadDoc;
