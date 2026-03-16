import { IonPage, IonContent } from '@ionic/react';
import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { submitFeedback } from '../../services/api.service';
import './FeedbackForm.css';

const categories = ['General', 'Venue', 'Registration', 'Staff', 'Food', 'Technical', 'Other'];

const FeedbackForm: React.FC = () => {
  const { eventId }           = useParams<{ eventId: string }>();
  const history               = useHistory();
  const [rating, setRating]   = useState(0);
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const validate = (): string | null => {
    if (rating === 0)
      return 'Please select a rating.';
    if (!category)
      return 'Please select a category.';
    if (!message.trim())
      return 'Please write a message.';
    if (message.trim().length < 10)
      return 'Message must be at least 10 characters.';
    if (message.trim().length > 1000)
      return 'Message cannot exceed 1000 characters.';
    // Strip any HTML tags entered by user
    const stripped = message.replace(/<[^>]*>/g, '').trim();
    if (stripped.length === 0)
      return 'Message cannot contain only HTML tags.';
    return null;
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await submitFeedback({
        Event_id:     parseInt(eventId),
        Rating:       rating,
        Category:     category,
        Message:      message.replace(/<[^>]*>/g, '').trim(), // sanitize before sending
        Is_Anonymous: isAnonymous,
      });
      history.replace(`/thank-you/${result.id}`);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const stars = [1, 2, 3, 4, 5];
  const ratingLabels: Record<number, string> = {
    1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent'
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="form-container">
          <div className="form-header">
            <button className="form-back" onClick={() => history.goBack()}>← Back</button>
            <div className="form-event-tag">Event #{eventId}</div>
          </div>

          <h2 className="form-title">How was your experience?</h2>
          <p className="form-sub">Take a moment to rate and review the event.</p>

          {/* Rating */}
          <div className="form-section">
            <label className="form-label">Your Rating</label>
            <div className="stars-row">
              {stars.map(s => (
                <button
                  key={s}
                  className={`star-btn ${s <= rating ? 'active' : ''}`}
                  onClick={() => setRating(s)}
                >★</button>
              ))}
            </div>
            {rating > 0 && (
              <p className="rating-label">{ratingLabels[rating]}</p>
            )}
          </div>

          {/* Category */}
          <div className="form-section">
            <label className="form-label">Category</label>
            <div className="category-grid">
              {categories.map(c => (
                <button
                  key={c}
                  className={`cat-btn ${category === c ? 'active' : ''}`}
                  onClick={() => setCategory(c)}
                >{c}</button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="form-section">
            <label className="form-label">Your Message</label>
            <textarea
              className="form-textarea"
              rows={4}
              placeholder="Tell us about your experience..."
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <p className="char-count">{message.length} / 500</p>
          </div>

          {/* Anonymous */}
          <div className="form-section anon-row">
            <div>
              <p className="form-label" style={{ margin: 0 }}>Submit Anonymously</p>
              <p className="anon-sub">Your name won't be shown</p>
            </div>
            <button
              className={`toggle-btn ${isAnonymous ? 'on' : ''}`}
              onClick={() => setIsAnonymous(!isAnonymous)}
            >
              <span className="toggle-thumb" />
            </button>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default FeedbackForm;