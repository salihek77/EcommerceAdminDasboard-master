import { FaArrowLeft, FaArrowRight, FaUser, FaLock, FaGoogle, FaEnvelope } from 'react-icons/fa';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../axios";
import { useAuthStore } from "../../store/authStore";
import { toast } from 'sonner';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !password) {
      setError('All fields are required');
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await axios.post('auth/login', { name, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        login({ user, token });
        navigate('/ecommerce');
      } else {
        await axios.post('auth/register', { name, email, password });
        toast.success("An email verification link has been sent to your email. Please verify to log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
      toast.error("An error occurred");
    }
  };

  const handleForgotPasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    alert(`Password reset instructions sent to ${email}`);
    setIsForgotPassword(false);
  };

  return (
    <div style={styles.container}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.imageTextContainer}>
          
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
          <h1 style={styles.welcomeBack}>Welcome back</h1>
          <p style={styles.subText}>Please enter your details.</p>
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
              <button type="submit" style={styles.button}>Send Instructions</button>
              <p onClick={() => setIsForgotPassword(false)} style={styles.linkText}>
                Back to Login
              </p>
            </>
          ) : (
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
              <button type="submit" style={styles.button}>Log In</button>
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
    flexWrap: 'wrap', // For responsiveness
  },
  leftPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative', // To position arrows and overlay
  },
  imageTextContainer: {
    position: 'absolute',
    top: '50%', // Vertically center the text
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
    // Styling for "Web Dev Creative"
    fontSize: '36px',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    zIndex: 0,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    display: 'flex',
    alignItems: 'center', // Align arrows horizontally
    zIndex: 2,
  },
  arrow: {
    fontSize: '40px',
    color: 'white',
    cursor: 'pointer',
    margin: '5px',
    borderRadius: '50%', // Rounded arrows
    padding: '10px',
    backgroundColor: 'transparent', // Transparent background
    border: '2px solid white', // White border for arrows
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '40px',
    position: 'relative',
  },
  welcomeTextContainer: {
    position: 'absolute',
    top: '160px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  welcomeBack: {
    fontSize: '38px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'black',
  },
  subText: {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.5',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  formHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: 'none', // Remove border
    borderBottom: '1px solid #ccc', // Add bottom line
    fontSize: '14px',
    outline: 'none', // Remove outline on focus
  },
  button: {
    padding: '10px',
    backgroundColor: 'black', // Black button color
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
  },
  googleButton: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '15px',
    fontSize: '14px',
  },
  orTextContainer: {
    textAlign: 'center',
    margin: '10px 0',
    fontSize: '14px',
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
    fontSize: '14px',
    color: '#888',
  },
  optionsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '14px',
  },
  linkText: {
    color: '#4c51bf',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  error: {
    color: '#e53e3e',
    fontSize: '12px',
    marginBottom: '15px',
  },
  footerText: {
    textAlign: 'center',
    fontSize: '14px',
    marginTop: '10px',
  },

  // Responsive Styles
  '@media (max-width: 768px)': {
    container: {
      flexDirection: 'column',
    },
    leftPanel: {
      height: 'auto', // Allow image to scale properly
    },
    imageText: {
      fontSize: '20px', // Adjust font size for smaller screens
    },
    welcomeBack: {
      fontSize: '28px', // Smaller header for mobile
    },
    formHeader: {
      fontSize: '20px', // Smaller form header
    },
    rightPanel: {
      padding: '20px', // Reduce padding on mobile
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
