import { IonPage, IonContent } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { logAction } from '../../services/audit.service';
import { useEffect } from 'react';
import './ThankYou.css';

const ThankYou: React.FC = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const history        = useHistory();

  useEffect(() => {
    logAction('PAGE_LOAD', `Guest reached thank you page — Feedback ID: ${feedbackId}`,
      parseInt(feedbackId));
  }, [feedbackId]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="ty-container">
          <div className="ty-bg" />
          <div className="ty-content">
            <div className="ty-icon">✓</div>
            <h1 className="ty-title">Thank You!</h1>
            <p className="ty-message">
              Your feedback has been received. We truly appreciate you taking the time to share your experience with us.
            </p>
            <div className="ty-id-card">
              <p className="ty-id-label">Feedback Reference</p>
              <p className="ty-id-value">#{feedbackId}</p>
            </div>
            <p className="ty-note">
              Keep this reference number to track your feedback status.
            </p>
            <button className="ty-btn" onClick={() => history.push('/')}>
              Submit Another
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ThankYou;