import React, { useState } from 'react';

// --- Sub-Components ---

const RatingChips = ({ rating, setRating, disabled, isDarkMode }) => (
  <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
    {[1, 2, 3, 4, 5].map((num) => (
      <button
        key={num}
        type="button"
        disabled={disabled}
        onClick={() => setRating(num)}
        style={{
          padding: '10px 15px',
          borderRadius: '20px',
          border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
          backgroundColor: rating === num ? '#007bff' : (isDarkMode ? '#333' : '#f8f9fa'),
          color: rating === num ? 'white' : (isDarkMode ? '#fff' : '#000'),
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease', // Smooth color transition
        }}
      >
        {num}
      </button>
    ))}
  </div>
);

const CommentBox = ({ comment, setComment, disabled, isDarkMode }) => (
  <textarea
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    disabled={disabled}
    placeholder="Enter your comment"
    rows="4"
    style={{ 
      width: '100%', 
      marginBottom: '15px', 
      padding: '10px',
      backgroundColor: isDarkMode ? '#222' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
      borderRadius: '5px',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease',
    }}
  />
);

const SubmitButton = ({ disabled, isSubmitting }) => (
  <button
    type="submit"
    disabled={disabled}
    style={{
      padding: '10px 20px',
      backgroundColor: disabled ? '#6c757d' : '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
    }}
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
);

const SummaryPanel = ({ submissions, isDarkMode }) => {
  const total = submissions.length;
  const average = total === 0 ? 0 : (submissions.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1);
  const recentComments = submissions.slice(0, 3).map(sub => sub.comment).filter(Boolean);

  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '15px', 
      borderTop: `2px solid ${isDarkMode ? '#444' : '#eee'}`,
      transition: 'all 0.2s ease'
    }}>
      <h3>Summary</h3>
      <p>Total submissions: {total}</p>
      <p>Average rating: {average}</p>
      
      <hr style={{ 
        border: 'none', 
        borderTop: `1px solid ${isDarkMode ? '#555' : '#ccc'}`, 
        margin: '15px -15px',
        transition: 'all 0.2s ease'
      }} />

      <ul style={{ paddingLeft: '20px' }}>
        {recentComments.map((text, index) => (
          <li key={index}>"{text}"</li>
        ))}
      </ul>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  // Added theme state, defaulting to false (Light Mode)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) return;

    setIsSubmitting(true);
    setMessage('Thank you for your feedback.');

    setSubmissions((prev) => [{ rating, comment, id: Date.now() }, ...prev]);

    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      setRating(null);
      setComment('');
    }, 3000);
  };

  const themeStyles = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
    color: isDarkMode ? '#ffffff' : '#333333',
    minHeight: '100vh', 
    padding: '40px 20px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={themeStyles}>
      <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        
        {/* Header section with Theme Toggle Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Mini Sentiment Widget</h2>
          <button 
            type="button"
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: 'transparent',
              border: `1px solid ${isDarkMode ? '#555' : '#ccc'}`,
              color: isDarkMode ? '#fff' : '#000',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <RatingChips rating={rating} setRating={setRating} disabled={isSubmitting} isDarkMode={isDarkMode} />
          <CommentBox comment={comment} setComment={setComment} disabled={isSubmitting} isDarkMode={isDarkMode} />
          
          <SubmitButton disabled={!rating || isSubmitting} isSubmitting={isSubmitting} />
          
          {message && <p style={{ color: '#28a745', fontWeight: 'bold', marginTop: '15px' }}>{message}</p>}
        </form>
        <SummaryPanel submissions={submissions} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}