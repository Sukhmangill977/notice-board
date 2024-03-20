// components/AddNotice.js
import React, { useState } from 'react';
import axios from 'axios';

const AddNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/notices', { title, content });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  return (
    <div>
      <h2>Add New Notice</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} required />
        </div>
        <button type="submit">Add Notice</button>
      </form>
    </div>
  );
}

export default AddNotice;
