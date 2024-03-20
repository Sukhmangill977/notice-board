// components/NoticeBoard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get('/api/notices')
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
      });
  }, []);

  return (
    <div>
      <h1>Notice Board</h1>
      <ul>
        {notices.map(notice => (
          <li key={notice._id}>
            <h3>{notice.title}</h3>
            <p>{notice.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoticeBoard;
