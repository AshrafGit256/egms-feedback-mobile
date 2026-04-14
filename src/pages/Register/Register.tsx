import { IonPage, IonContent } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../services/auth.service';
import '../Login/Login.css';

const Register: React.FC = () => {
  const history = useHistory();
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');
  const [showPass,  setShowPass]  = useState(false);

  const handleRegister = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register({
        first_Name: firstName.trim(),
        last_Name:  lastName.trim(),
        email:      email.trim(),
        password,
        role: 'Organiser'
      });
      history.replace('/login');
    } catch (e: any) {
      setError(e.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={true}>
        <div className="auth-container" style={{ alignItems: 'flex-start', paddingTop: 40 }}>
          <div className="auth-bg" />
          <div className="auth-card">

            <div className="auth-logo-wrap">
              <img src="/assets/YoPass1.png" className="auth-logo" alt="YoPas" />
            </div>

            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join the YoPas platform</p>

            {/* First Name */}
            <div className="auth-field">
              <label className="auth-label">
                <i className="fas fa-user me-2"></i>First Name
              </label>
              <input className="auth-input" type="text" placeholder="John"
                value={firstName} onChange={e => setFirstName(e.target.value)} />
            </div>

            {/* Last Name */}
            <div className="auth-field">
              <label className="auth-label">
                <i className="fas fa-user me-2"></i>Last Name
              </label>
              <input className="auth-input" type="text" placeholder="Doe"
                value={lastName} onChange={e => setLastName(e.target.value)} />
            </div>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">
                <i className="fas fa-envelope me-2"></i>Email Address
              </label>
              <input className="auth-input" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">
                <i className="fas fa-lock me-2"></i>Password
              </label>
              <div className="auth-input-wrap">
                <input className="auth-input" type={showPass ? 'text' : 'password'}
                  placeholder="Min 6 characters" value={password}
                  onChange={e => setPassword(e.target.value)} />
                <button className="auth-eye" onClick={() => setShowPass(!showPass)} type="button">
                  <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label className="auth-label">
                <i className="fas fa-lock me-2"></i>Confirm Password
              </label>
              <input className="auth-input" type="password"
                placeholder="Repeat your password" value={confirm}
                onChange={e => setConfirm(e.target.value)} />
            </div>

            {error && (
              <div className="auth-error">
                <i className="fas fa-exclamation-circle me-2"></i>{error}
              </div>
            )}

            <button className="auth-btn" onClick={handleRegister} disabled={loading}>
              {loading
                ? <><i className="fas fa-spinner fa-spin me-2"></i>Creating account...</>
                : <><i className="fas fa-user-plus me-2"></i>Create Account</>}
            </button>

            <div className="auth-divider"><span>already have an account?</span></div>

            <button className="auth-btn-outline" onClick={() => history.replace('/login')}>
              <i className="fas fa-sign-in-alt me-2"></i>Sign In Instead
            </button>

            <p className="auth-footer">YoPas Guest Experience Platform</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;