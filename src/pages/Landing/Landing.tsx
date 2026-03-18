import { IonPage, IonContent } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logAction } from '../../services/audit.service';
import './Landing.css';

const Landing: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    logAction('PAGE_LOAD', 'Guest landed on the feedback home page');
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="landing-container">
          <div className="landing-bg" />
          <div className="landing-content">
            <div className="landing-badge">EGMS</div>
            <h1 className="landing-title">Share Your<br /><span>Experience</span></h1>
            <p className="landing-subtitle">
              Your feedback helps us create better events for everyone. It only takes a minute.
            </p>
            <button className="landing-btn" onClick={() => {
              logAction('CTA_CLICKED', 'Guest clicked Give Feedback button');
              history.push('/feedback/1');
            }}>
              Give Feedback
              <span className="landing-btn-arrow">→</span>
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Landing;