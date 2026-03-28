import React, { useState } from 'react';

// --- Sub-Components ---

const RatingChips = ({ rating, setRating, disabled }) => (
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
          border: '1px solid #ccc',
          backgroundColor: rating === num ? '#007bff' : '#f8f9fa',
          color: rating === num ? 'white' : '#000',
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {num}
      </button>
    ))}
  </div>
);

const CommentBox = ({ comment, setComment, disabled }) => (
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
      backgroundColor: '#fff',
      color: '#000',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
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
    }}
  >
    {isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
);

const SummaryPanel = ({ submissions }) => {
  const total = submissions.length;
  const average = total === 0 ? 0 : (submissions.reduce((acc, curr) => acc + curr.rating, 0) / total).toFixed(1);
  const recentComments = submissions.slice(0, 3).map(sub => sub.comment).filter(Boolean);

  return (
    <div style={{ marginTop: '30px', padding: '15px', borderTop: '2px solid #eee' }}>
      <h3>Summary</h3>
      <p>Total submissions: {total}</p>
      <p>Average rating: {average}</p>
      
      <hr style={{ 
        border: 'none', 
        borderTop: '1px solid #ccc', 
        margin: '15px -15px' 
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

  const baseStyles = {
    backgroundColor: '#ffffff',
    color: '#333333',
    minHeight: '100vh', 
    padding: '40px 20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={baseStyles}>
      <div style={{ maxWidth: '400px', margin: '0 auto', fontFamily: 'sans-serif' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: 0 }}>Mini Sentiment Widget</h2>
        </div>
        
        <form onSubmit={handleSubmit}>
          <RatingChips rating={rating} setRating={setRating} disabled={isSubmitting} />
          <CommentBox comment={comment} setComment={setComment} disabled={isSubmitting} />
          
          <SubmitButton disabled={!rating || isSubmitting} isSubmitting={isSubmitting} />
          
          {message && <p style={{ color: '#28a745', fontWeight: 'bold', marginTop: '15px' }}>{message}</p>}
        </form>
        <SummaryPanel submissions={submissions} />
      </div>
    </div>
  );
}