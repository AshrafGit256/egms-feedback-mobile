import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Landing.css';

const Landing: React.FC = () => {
  const history = useHistory();

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
            <button className="landing-btn" onClick={() => history.push('/feedback/1')}>
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