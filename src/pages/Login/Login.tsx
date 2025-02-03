import { FaArrowLeft, FaArrowRight, FaGoogle } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios";
import { useAuthStore } from "../../store/authStore";
import { toast } from 'sonner';

const Login = () => {
  const [name, setName] = useState<string>(''); // Username
  const [password, setPassword] = useState<string>(''); // Password
  const [confirmPassword, setConfirmPassword] = useState<string>(''); // Confirm Password
  const [email, setEmail] = useState<string>(''); // Email (for sign up)
  const [error, setError] = useState<string>(''); // Error message
  const [isLogin, setIsLogin] = useState<boolean>(true); // State to track login/register form
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false); // State for forgot password
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!name || !password || (isLogin && !email)) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await axios.post('auth/login', { name, password });
        const { token, user } = response.data;

        // Store token securely in cookies (HTTP-only)
        document.cookie = `token=${token}; path=/; secure; HttpOnly`;

        login({ user, token });
        navigate('/ecommerce');
      } else {
        // Register a new user
        response = await axios.post('auth/register', { name, email, password });
        toast.success("Username created successfully! Please verify your email to log in.");
        setIsLogin(true); // Switch to login screen
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      await axios.post('auth/forgot-password', { email });
      toast.success(`Password reset instructions sent to ${email}`);
      setIsForgotPassword(false);
    } catch (err: any) {
      setError('An error occurred while sending reset instructions.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.imageTextContainer}>
          {/* Add any text or branding here */}
        </div>
        <div style={styles.imageOverlay}></div>
        <img
          src="https://au.res.keymedia.com/files/image/iStock-computer_programmer_teamwork-502862551.jpg"
          alt="Welcome"
          style={styles.image}
        />
        <div style={styles.arrowContainer}>
          <FaArrowLeft style={styles.arrow} />
          <FaArrowRight style={styles.arrow} />
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.welcomeTextContainer}>
          <h1 style={styles.welcomeBack}>{isLogin ? 'Welcome back' : 'Create Account'}</h1>
          <p style={styles.subText}>{isLogin ? 'Please enter your details.' : 'Please create a new account.'}</p>
        </div>
        <form style={styles.form} onSubmit={isForgotPassword ? handleForgotPasswordSubmit : handleSubmit}>
          {isForgotPassword ? (
            <>
              <h1 style={styles.formHeader}>Reset Password</h1>
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && <p style={styles.error}>{error}</p>}
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Sending...' : 'Send Instructions'}
              </button>
              <p onClick={() => setIsForgotPassword(false)} style={styles.linkText}>
                Back to Login
              </p>
            </>
          ) : isLogin ? (
            <>
              <button type="button" style={styles.googleButton}>
                <FaGoogle style={{ marginRight: 10 }} /> Log in with Google
              </button>
              <p style={styles.orTextContainer}>
                <span style={styles.orLine}></span>
                <span style={styles.orText}>or</span>
                <span style={styles.orLine}></span>
              </p>
              <input
                type="text"
                placeholder="Enter your username"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <p style={styles.error}>{error}</p>}
              <div style={styles.optionsRow}>
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <p style={styles.linkText} onClick={() => setIsForgotPassword(true)}>Forgot Password?</p>
              </div>
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Logging In...' : 'Log In'}
              </button>
              <p style={styles.footerText}>
                Don't have an account?{" "}
                <span
                  style={styles.linkText}
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                >
                  Sign up for free
                </span>
              </p>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter your username"
                style={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter your password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm your password"
                style={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && <p style={styles.error}>{error}</p>}
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
              <p style={styles.footerText}>
                Already have an account?{" "}
                <span
                  style={styles.linkText}
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                >
                  Log in
                </span>
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    flexWrap: 'wrap', 
  },
  leftPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', 
    backgroundColor: '#fff',  // Changed background color to white
  },
  imageTextContainer: {
    position: 'absolute',
    top: '50%', 
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    textAlign: 'center',
    maxWidth: '90%',
    padding: '20px',
  },
  imageText: {
    fontSize: '28px',
    color: 'white',
    fontWeight: 'bold',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  webDevCreative: {
    fontSize: '36px',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '36px', 
    border: '5px solid #fff', 
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 0,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center', 
    zIndex: 2,
  },
  arrow: {
    fontSize: '40px',
    color: 'white',
    cursor: 'pointer',
    margin: '5px',
    borderRadius: '50%', 
    padding: '10px',
    backgroundColor: 'transparent', 
    border: '2px solid white', 
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    position: 'relative',
    borderRadius: '36px',
    marginLeft: '20px', 
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: '150px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  welcomeBack: {
    fontSize: '44px', 
    fontWeight: 'bold',
    marginBottom: '12px',
    color: 'black',
  },
  subText: {
    fontSize: '20px', 
    color: '#555',
    lineHeight: '1.5',
  },
  form: {
    width: '100%',
    maxWidth: '660px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: '10px 8px 20px 8px',
  },
  formHeader: {
    fontSize: '30px', 
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  label: {
    fontSize: '22px', 
    marginBottom: '10px',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    border: '6px', 
    borderBottom: '1px solid #ccc', 
    fontSize: '16px', 
    outline: 'none', 
  },
  button: {
    padding: '12px',
    backgroundColor: 'black', 
    color: '#fff',
    fontSize: '18px', 
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  googleButton: {
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
    fontSize: '16px',
  },
  orTextContainer: {
    textAlign: 'center',
    margin: '15px 0', 
    fontSize: '16px', 
    color: '#888',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orLine: {
    flex: 1,
    borderBottom: '1px solid #ccc',
    margin: '0 10px',
  },
  orText: {
    fontSize: '16px', 
    color: '#888',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '16px', 
  },
  linkText: {
    color: '#4c51bf',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    color: '#e53e3e',
    fontSize: '14px', 
    marginBottom: '15px',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '16px', 
    marginTop: '10px',
  },

  // Responsive Styles
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',
    },
    leftPanel: {
      height: 'auto', 
    },
    imageText: {
      fontSize: '20px', 
    },
    welcomeBack: {
      fontSize: '32px', 
    },
    formHeader: {
      fontSize: '24px', 
    },
    rightPanel: {
      padding: '20px', 
    },
    form: {
      padding: '10px',
    },
    input: {
      marginBottom: '10px',
    },
  },
};

export default Login;
