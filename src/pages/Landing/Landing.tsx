import { IonPage, IonContent } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logAction } from '../../services/audit.service';
import './Landing.css';

import { logout, getUser } from '../../services/auth.service';

const Landing: React.FC = () => {
  const history = useHistory();

  const user = getUser();

  const handleLogout = async () => {
    await logout();
    history.replace('/login');
  };

  useEffect(() => {
    logAction('PAGE_LOAD', 'Guest landed on the feedback home page');
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>

        {/* Header with user info and logout */}
        <div className="landing-header">
          <div className="landing-user">
            <i
              className="fas fa-user-circle me-2"
              style={{ color: '#2E5F9E' }}
            ></i>
            <span>
              {user ? `${user.first_Name} ${user.last_Name}` : 'Guest'}
            </span>
            <span className="landing-role">
              {user?.role || 'Visitor'}
            </span>
          </div>
          <button className="landing-logout" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>

        {/* Main Landing Content */}
        <div className="landing-container">
          <div className="landing-bg" />

          <div className="landing-content">
            <div className="landing-badge">EGMS</div>

            <h1 className="landing-title">
              Share Your<br />
              <span>Experience</span>
            </h1>

            <p className="landing-subtitle">
              Your feedback helps us create better events for everyone. It only takes a minute.
            </p>

            <button
              className="landing-btn"
              onClick={() => {
                logAction(
                  'CTA_CLICKED',
                  'Guest clicked Give Feedback button'
                );
                history.push('/feedback/1');
              }}
            >
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