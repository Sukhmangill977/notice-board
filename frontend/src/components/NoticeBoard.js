import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoticeBoard.css';

function NoticeBoard({ loggedIn }) {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get('/api/notices')
      .then(response => {
        // Reverse the array of notices to show the most recent ones at the top
        setNotices(response.data.reverse());
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  const deleteNotice = async (id) => {
    try {
      await axios.delete(`/api/notices/${id}`);
      const updatedNotices = notices.filter((notice) => notice._id !== id);
      setNotices(updatedNotices);
    } catch (error) {
      console.error('Error deleting notice:', error);
      // Display an error message to the user if needed
    }
  };

  return (
    <div className="notice-board">
      <h1>Notice Board</h1>
      {notices.map(notice => (
        <div key={notice._id} className="notice">
          <h3>
            <img
              src="common-image.png"
              alt="Common Notice Icon"
              style={{ height: "20px", width: "20px" }}
            /> {/* Adjust size as needed */}
            {notice.title}
          </h3>
          <p>{notice.content}</p>
          {notice.imageUrl && <img src={notice.imageUrl} alt="Notice" />}
          {loggedIn && <button onClick={() => deleteNotice(notice._id)}>Delete</button>}
        </div>
      ))}
    </div>
  );
}

export default NoticeBoard;
