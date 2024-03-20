import React, { useState } from 'react';
import axios from 'axios';

export default function EditNotice({ notice, onClose }) {
  const [title, setTitle] = useState(notice.title);
  const [content, setContent] = useState(notice.content);
  const [imageUrl, setImageUrl] = useState(notice.imageUrl); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedNotice = {
        title,
        content,
        imageUrl,
      };
      await axios.put(`https://notice-board-4d7b.onrender.com/api/notices/${notice._id}`, updatedNotice);
      onClose();
    } catch (error) {
      console.error('Error updating notice:', error);
    }
  };

  return (
    <div className="edit-notice-container">
      <h2>Edit Notice</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Content:
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
