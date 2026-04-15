import { IonPage, IonContent } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedIn, getUser } from '../../services/auth.service';
import './Splash.css';

const Splash: React.FC = () => {
  const history = useHistory();
  const [fading, setFading] = useState(false);
  const user = getUser();

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setFading(true);

      const redirectTimer = setTimeout(() => {
        history.replace(isLoggedIn() ? '/home' : '/login');
      }, 600);

      return () => clearTimeout(redirectTimer);
    }, 2000);

    return () => clearTimeout(showTimer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className={`splash-screen ${fading ? 'splash-fade-out' : ''}`}>

          {/* SVG Gradients (hidden) */}
          <svg height="0" width="0" className="absolute">
            <defs>
              <linearGradient id="yop-b" x1="0" y1="62" x2="0" y2="2">
                <stop stopColor="#973BED" />
                <stop offset="1" stopColor="#007CFF" />
              </linearGradient>

              <linearGradient id="yop-c" x1="0" y1="64" x2="0" y2="0">
                <stop stopColor="#FFC800" />
                <stop offset="1" stopColor="#FF00FF" />
              </linearGradient>

              <linearGradient id="yop-d" x1="0" y1="62" x2="0" y2="2">
                <stop stopColor="#00E0ED" />
                <stop offset="1" stopColor="#00DA72" />
              </linearGradient>

              <linearGradient id="yop-e" x1="0" y1="62" x2="0" y2="2">
                <stop stopColor="#FF6B6B" />
                <stop offset="1" stopColor="#FFE66D" />
              </linearGradient>

              <linearGradient id="yop-f" x1="0" y1="64" x2="0" y2="0">
                <stop stopColor="#00C9FF" />
                <stop offset="1" stopColor="#92FE9D" />
              </linearGradient>
            </defs>
          </svg>

          {/* YOPAS Loader */}
          <div className="loader">

            {/* Y */}
            <svg viewBox="0 0 64 64">
              <path d="M8,6 L32,32 L56,6 M32,32 L32,58"
                stroke="url(#yop-b)"
                className="dash"
                pathLength={360}
              />
            </svg>

            {/* O */}
            <svg viewBox="0 0 64 64">
              <path d="M32 32 m 0 -23 a 23 23 0 1 1 0 46 a 23 23 0 1 1 0 -46"
                stroke="url(#yop-c)"
                className="spin"
                pathLength={360}
              />
            </svg>

            {/* P */}
            <svg viewBox="0 0 64 64">
              <path d="M14,6 L14,58 M14,6 L38,6 C50,6 50,30 38,30 L14,30"
                stroke="url(#yop-d)"
                className="dash-p"
                pathLength={360}
              />
            </svg>

            {/* A */}
            <svg viewBox="0 0 64 64">
              <path d="M8,58 L32,6 L56,58 M16,38 L48,38"
                stroke="url(#yop-e)"
                className="dash-a"
                pathLength={360}
              />
            </svg>

            {/* S */}
            <svg viewBox="0 0 64 64">
              <path d="M52,14 C52,8 44,5 32,5 C20,5 12,10 12,18 C12,26 20,29 32,32 C44,35 52,38 52,46 C52,54 44,59 32,59 C20,59 12,56 12,50"
                stroke="url(#yop-f)"
                className="dash-s"
                pathLength={360}
              />
            </svg>

          </div>

          <div className="splash-tagline">Guest Experience Platform</div>

          {user && (
            <div className="splash-greeting">
              Welcome back, <strong>{user.first_Name}</strong> 👋
            </div>
          )}

          <div className="splash-footer">
            EGMS · Powered by YoPas
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;