import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5050';

function App() {
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/feedback`);
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    if (!studentName || !course || !rating) {
      setSubmitStatus({ success: false, message: 'Please fill all required fields.' });
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName, course, rating: Number(rating), comments }),
      });

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Feedback submitted successfully!' });
        setStudentName('');
        setCourse('');
        setRating(5);
        setComments('');
        fetchFeedbacks();
      } else {
        const resData = await response.json();
        setSubmitStatus({ success: false, message: resData.message || 'Submission failed.' });
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: 'Error submitting feedback.' });
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>🌌 Student Feedback Portal</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <label style={styles.label}>
			<span style={styles.labelText}>Student Name<span style={styles.required}>*</span>:</span>
            <input
              type="text"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
              style={styles.input}
              placeholder="Enter your name"
              required
            />
          </label>
          <label style={styles.label}>
			<span style={styles.labelText}>
            Course<span style={styles.required}>*</span>:</span>
            <input
              type="text"
              value={course}
              onChange={e => setCourse(e.target.value)}
              style={styles.input}
              placeholder="Enter course name"
              required
            />
          </label>
          <label style={styles.label}>
			<span style={styles.labelText}>
            Rating (1-5)<span style={styles.required}>*</span>:</span>
            <select
              value={rating}
              onChange={e => setRating(e.target.value)}
              style={styles.select}
              required
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>
          <label style={styles.label}>
            Comments:
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              style={styles.textarea}
              placeholder="Your comments..."
            />
          </label>
          <button type="submit" style={styles.button}>🚀 Submit Feedback</button>
          {submitStatus && (
            <p style={{ color: submitStatus.success ? 'lightgreen' : 'red', marginTop: 10 }}>
              {submitStatus.message}
            </p>
          )}
        </form>
        <hr style={styles.divider} />
        <h2 style={styles.subTitle}>✨ Feedback Received</h2>
        {loading ? (
          <p style={styles.text}>Loading feedback...</p>
        ) : (
          feedbackList.length === 0 ? (
            <p style={styles.text}>No feedback submitted yet.</p>
          ) : (
            <div style={styles.feedbackContainer}>
              {feedbackList.map(feedback => (
                <div key={feedback._id} style={styles.feedbackCard}>
                  <p><strong>Name:</strong> {feedback.studentName}</p>
                  <p><strong>Course:</strong> {feedback.course}</p>
                  <p><strong>Rating:</strong> {feedback.rating} / 5</p>
                  {feedback.comments && <p><strong>Comments:</strong> {feedback.comments}</p>}
                  <p style={styles.timestamp}>{new Date(feedback.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

const styles = {

page: {
//   width: '100vw',          
//   height: '100vh',        
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  color: '#ffffff',
  padding: 20,
  boxSizing: 'border-box',
},


  container: {
    width: '100%',
    maxWidth: 800,
	justifyContent:'center',
    padding: 30,
    borderRadius: 12,
    background: 'rgba(30, 30, 30, 0.9)',
    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: 30,
    color: '#00ffff',
    textShadow: '0 0 10px #00ffff',
  },
  subTitle: {
    color: '#00ffff',
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  label: {
    fontWeight: 'bold',
    color: '#dddddd',
    display: 'flex',
    flexDirection: 'column',
  },
  labelText: {
  display: 'inline-flex', // keeps label and * on same line
  alignItems: 'center',
  gap: 4,
},
  required: {
    color: 'red',
    marginLeft: 4,
  },
  input: {
    marginTop: 6,
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: 'white',
  },
  select: {
    marginTop: 6,
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: 'white',
    width: 100,
  },
  textarea: {
    marginTop: 6,
    padding: '10px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #555',
    backgroundColor: '#1e1e1e',
    color: 'white',
    minHeight: 80,
    resize: 'vertical',
  },
  button: {
    marginTop: 10,
    padding: '12px 20px',
    fontSize: 18,
    backgroundColor: '#00ffff',
    color: '#000',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
    transition: 'all 0.3s ease',
  },
  divider: {
    margin: '30px 0',
    border: '1px solid #444',
  },
  feedbackContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  feedbackCard: {
    backgroundColor: '#2b2b2b',
    padding: 15,
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,255,255,0.2)',
    color: '#ffffff',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 10,
  },
  text: {
    color: '#ccc',
    textAlign: 'center',
  },
};

export default App;
