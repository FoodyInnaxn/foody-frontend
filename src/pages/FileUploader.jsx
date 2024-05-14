import React, { useState } from 'react';

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
      console.log('File:', file.name, 'Size:', file.size); // Log filename and size of each file
    });

    try {
      console.log('Files:', JSON.stringify(files)); // Log the entire files array
      // Here you can send formData to the server using fetch or axios
    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle error here
    }
  };

  return (
    <div>
      <h2>Upload Files</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploader;
