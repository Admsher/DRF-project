import React, { useState } from 'react'
import PdfPreview from './pdfpreview';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UploadDoc({generatedQuestions,setGeneratedQuestions}) {

  const [view,setView] = useState(false);
  const [file,setFile] = useState(null);
  const [url,setUrl] = useState("")
  const [uploadFile,setUploadFile] = useState(false)
  const [uploadUrl,setUploadUrl] = useState(false)
  const [choice,setChoice] = useState(true)
  const [fileType,setFileType] = useState("");
  const [fileInfo, setFileInfo] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const [recentFiles, setRecentFiles] = useState(() => {
    try {
      const savedFiles = localStorage.getItem('recentFiles');
        if(!savedFiles || savedFiles.length==0)
        {
          return [
            {
                "name": "Vishnu Vardhan Udayagiri Resume.pdf",
                "type": "application/pdf",
                "size": "202.38",
                "date": "6/23/2024",
                "time": "2:19:22 PM"
            },
            {
                "name": "Vishnu Vardhan Udayagiri Resume.pdf",
                "type": "application/pdf",
                "size": "202.38",
                "date": "6/22/2024",
                "time": "3:30:55 PM"
            },
            {
                "name": "Vishnu Vardhan Udayagiri Resume.pdf",
                "type": "application/pdf",
                "size": "202.38",
                "date": "6/22/2024",
                "time": "2:17:09 PM"
            },
            {
                "name": "Vishnu Vardhan Udayagiri Resume.pdf",
                "type": "application/pdf",
                "size": "202.38",
                "date": "6/22/2024",
                "time": "1:19:08 PM"
            }];
        }
        else{
          return JSON.parse(savedFiles);
        }
    } catch (error) {
      return [
        {
            "name": "Vishnu Vardhan Udayagiri Resume.pdf",
            "type": "application/pdf",
            "size": "202.38",
            "date": "6/23/2024",
            "time": "2:19:22 PM"
        },
        {
            "name": "Vishnu Vardhan Udayagiri Resume.pdf",
            "type": "application/pdf",
            "size": "202.38",
            "date": "6/22/2024",
            "time": "3:30:55 PM"
        },
        {
            "name": "Vishnu Vardhan Udayagiri Resume.pdf",
            "type": "application/pdf",
            "size": "202.38",
            "date": "6/22/2024",
            "time": "2:17:09 PM"
        },
        {
            "name": "Vishnu Vardhan Udayagiri Resume.pdf",
            "type": "application/pdf",
            "size": "202.38",
            "date": "6/22/2024",
            "time": "1:19:08 PM"
        }];
    }
  });

  const toggle=()=>{setView(!view)}

  const handleQSubmit=()=>{
    localStorage.setItem('recentFiles', JSON.stringify(recentFiles));
    navigate('/message')
  }


  const handleFile=async(e)=>{
    const temp =e.target.files[0]
    if(temp.type==="application/pdf")
    {
      setFile(temp)
      setFileType('pdf');
    }
    else if(temp.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    {
      setFile(temp)
      setFileType('docx')
    }
    else{
      alert("Upload pdf or docx format files")
    }
    const uploadDate = new Date();
    const currFileInfo={
      name: temp.name,
      type: temp.type,
      size: (temp.size / 2048).toFixed(2), // size in KB
      date: uploadDate.toLocaleDateString(),
      time: uploadDate.toLocaleTimeString(),
    };
    setFileInfo(currFileInfo);
    setRecentFiles([currFileInfo,...recentFiles]);
  }

  const convert = async (doc) => {
    const formData = new FormData();
    formData.append('file', doc);

    try {
      const response = await axios.post('api', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setGeneratedQuestions(response || []);
      console.log(response);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileSubmit=(e)=>{
    e.preventDefault();
    if(!file)
    {
      alert("No file Selected")
      return
    }
    console.log(file);
    convert(file);
  }

  const handleUrl=(e)=>{
    setUrl(e.target.value);
  }

  const handleUrlSubmit= async(e)=>{
    e.preventDefault();
    console.log(url);
  }


  return ( 
    <div className='bg-ltblue text-white w-full h-full rounded-md overflow-auto flex items-center flex-col'>

      {/* Top section upload box */}
      <h2 className='w-full text-start text-xl p-5 pt-3'>Upload File</h2>
        <div
          className='text-base bg-ltgray text-black font-light px-3 rounded-md text-center  cursor-pointer'
          onClick={toggle}
          type="button"
          >
          <div className='text-4xl'>+</div>
          <p>Upload Document</p>
        </div>

      {/* Upload pop up */}
      {
        view&& 
        <div className='text-black absolute bg-mdblue w-3/5 h-5/6 p-2 rounded-lg top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 border-4 border-dkblue'>
          {/* Heading */}
          <div className='flex p-3 text-white'>
            <button
             className='px-2 rounded-md bg-white text-black text-xl'
             onClick={()=>{
              setChoice(true)
              setUploadFile(false)
              setUploadUrl(false)
              setFile(null)
              setFileInfo({})
             }}
             >{"<"}</button>
            <h2 className='w-[98%] text-center text-lg'>Upload Document</h2>
            <button
             className='text-end px-2 bg-white text-black rounded-md'
             onClick={toggle}
            >X</button>
        </div>
        {/* Content Inside */}
        <div className='border-dashed border-ltgray border-2 h-[90%]'>
            
          {/* Upload container */}  
          {
            uploadFile && 
            <div className='flex flex-col overflow-y-scroll h-full'>
              {/* File Input */}
              <div className='flex items-center justify-center p-4 text-white'>
                <form onSubmit={handleFileSubmit} className='flex flex-col justify-center space-y-3'>
                  <input type="file" onChange={handleFile} className='m-auto'/>
                  <button className='px-10 m-auto bg-white rounded-md text-dkblue'>Upload File</button>
                </form>
              </div>
              {/* File Preview */}
              <div className=' m-1 flex flex-col sm:flex-row items-center justify-center'>
                {/* preview */}
                <div className='overflow-hidden flex items-center justify-center'>
                  <div className='h-[70%] w-fit'>
                    { file && <PdfPreview pdfUrl={URL.createObjectURL(file)} />}
                  </div>
                </div>
                {/* File Info */}
                <div className=' text-white'>
                <h2 className='font-bold px-4'>File Information</h2>
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
                <form onSubmit={handleUrlSubmit} className=' space-x-5'>
                  <input 
                  type="text" 
                  value={url} 
                  onChange={handleUrl} 
                  className='text-black bg-white' 
                  placeholder='Enter Docx url'
                  />
                  <button className='px-2 bg-white text-black rounded-md'>upload url</button>
                </form>
                {error && <p>{error}</p>}
              </div>
              {/* file preview */}
            </div>
          }
          {/* Choice to choose upload url or file */}
          {
            choice && 
            <div className='p-10 h-3/4 flex items-center justify-center flex-col'>
              <button
              className='p-2 bg-white rounded-md' onClick={()=>{
                setUploadFile(!uploadFile)
                setChoice(!choice)
              }}>Upload File</button>
              <div className='text-white'>or</div>
              <button
               className='p-2 bg-white rounded-md' onClick={()=>{
                setUploadUrl(!uploadUrl)
                setChoice(!choice)
               }}>Upload Url</button>
            </div>
          }
        </div>
      </div>
      }
    </div>
  )
}

export default UploadDoc