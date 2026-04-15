import { IonPage, IonContent } from '@ionic/react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { login, saveAuth } from '../../services/auth.service';
import './Login.css';

const Login: React.FC = () => {
  const history  = useHistory();
  const location = useLocation<{ registered?: boolean }>();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [showPass, setShowPass] = useState(false);

  // Show success toast if redirected here after registration
  const justRegistered = location.state?.registered === true;

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const data = await login({ email: email.trim(), password });
      saveAuth(data);
      history.replace('/home');
    } catch (e: any) {
      setError(e.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="auth-container">
          <div className="auth-bg" />

          <div className="auth-card">

            {/* Logo */}
            <div className="auth-logo-wrap">
              <img src="/assets/YoPass1.png" className="auth-logo" alt="YoPas" />
            </div>

            {/* Title */}
            <h2 className="auth-title">Welcome Back</h2>
            <p className="auth-subtitle">Sign in to your YoPas account</p>

            {/* Registration success banner */}
            {justRegistered && (
              <div className="auth-success">
                <i className="fas fa-check-circle me-2"></i>
                Account created! Please sign in.
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

              {/* Email */}
              <div className="auth-field">
                <label className="auth-label">
                  <i className="fas fa-envelope me-2"></i>Email Address
                </label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  autoComplete="email"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="auth-field">
                <label className="auth-label">
                  <i className="fas fa-lock me-2"></i>Password
                </label>
                <div className="auth-input-wrap">
                  <input
                    className="auth-input"
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="current-password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="auth-eye"
                    onClick={() => setShowPass(!showPass)}
                  >
                    <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="auth-error">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? (
                  <><i className="fas fa-spinner fa-spin me-2"></i>Signing in...</>
                ) : (
                  <><i className="fas fa-sign-in-alt me-2"></i>Sign In</>
                )}
              </button>

            </form>

            <div className="auth-divider"><span>or</span></div>

            <button className="auth-btn-outline" onClick={() => history.push('/register')}>
              <i className="fas fa-user-plus me-2"></i>Create Account
            </button>

            <p className="auth-footer">YoPas Guest Experience Platform</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;