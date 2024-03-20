import React, { useState } from 'react';
import axios from 'axios';
import './AddNotice.css';

function AddNotice() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Cloudinary
    const imageData = new FormData();
    imageData.append('file', image);
    imageData.append('upload_preset', 'chat-connect');
    imageData.append('cloud_name', 'dbpapoto6');

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dbpapoto6/image/upload',
        {
          method: 'POST',
          body: imageData,
        }
      );
      const imageUploadData = await response.json();

      // Create notice with image URL
      const noticeData = {
        title,
        content,
        imageUrl: imageUploadData.secure_url,
      };

      // Send POST request to backend API to create a new notice
      await axios.post('https://notice-board-4d7b.onrender.com/api/notices', noticeData);

      // Clear form fields after successful submission
      setTitle('');
      setContent('');
      setImage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="add-notice-container">
      <h2>Add New Notice</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Add Notice</button>
      </form>
    </div>
  );
}

export default AddNotice;
