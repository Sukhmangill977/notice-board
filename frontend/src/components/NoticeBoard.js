import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NoticeBoard.css';
import EditNotice from './EditNotice';
import Modal from 'react-modal';

function NoticeBoard({ loggedIn }) {
  const [notices, setNotices] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [expandedNoticeId, setExpandedNoticeId] = useState(null);

  useEffect(() => {
    axios.get('/api/notices')
      .then(response => {
        setNotices(response.data.reverse());
        Modal.setAppElement('#root');
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
    }
  };

  const handleEdit = (notice) => {
    setSelectedNotice(notice);
    setOpenEditModal(true);
  };

  const handleEditClose = async (updatedNotice) => {
    setOpenEditModal(false);
    setSelectedNotice(null);
    if (updatedNotice) {
      const updatedNotices = notices.map((n) => (n._id === updatedNotice._id ? updatedNotice : n));
      setNotices(updatedNotices);
    }
  };

  const handleToggleExpand = (id) => {
    setExpandedNoticeId(expandedNoticeId === id ? null : id);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '50px',
    },
  };

  return (
    <div className="notice-board">
      <h1>Notice Board</h1>
      {notices.map(notice => (
        <div key={notice._id} className="notice" style={{ maxHeight: expandedNoticeId === notice._id ? 'none' : '300px' }}>
          <h3>
            <img
              src="common-image.png"
              alt="Common Notice Icon"
              style={{ height: "20px", width: "20px" }}
            />
            {notice.title}
          </h3>
          <p>{expandedNoticeId === notice._id ? notice.content : notice.content.slice(0, 150)}</p>
          {notice.imageUrl && <img src={notice.imageUrl} alt="Notice" />}
          {(notice.content.length > 150 || expandedNoticeId === notice._id) && (
            <button className="toggle-button" onClick={() => handleToggleExpand(notice._id)}>
              {expandedNoticeId === notice._id ? "Show Less" : "Read More"}
            </button>
          )}
          {loggedIn && <button onClick={() => deleteNotice(notice._id)}>Delete</button>}
          {loggedIn && <button onClick={() => handleEdit(notice)}>Edit</button>}
        </div>
      ))}
      {openEditModal && (
        <Modal
          isOpen={openEditModal}
          onRequestClose={handleEditClose}
          style={customStyles}
        >
          <EditNotice notice={selectedNotice} onClose={handleEditClose} />
        </Modal>
      )}
    </div>
  );
}

export default NoticeBoard;
