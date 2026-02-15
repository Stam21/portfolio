import React, { useCallback } from 'react';
import { 
  SiPython, 
  SiCplusplus, 
  SiC 
} from 'react-icons/si';
import { FaJava, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: {
      color: {
        value: "#0a0a1e",
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          links: {
            opacity: 0.5,
          },
        },
        push: {
          quantity: 2,
        },
      },
    },
    particles: {
      color: {
        value: "#60a5fa",
      },
      links: {
        color: "#60a5fa",
        distance: 120,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.7,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: 3,
      },
    },
    detectRetina: true,
  };

  const goToDemos = () => {
    navigate('/demos');
  };

  const contactIconStyle = {
    color: '#ffffff', 
    marginRight: '15px',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  const handleIconHover = (e) => {
    e.target.style.color = '#60a5fa';
  };

  const handleIconLeave = (e) => {
    e.target.style.color = '#ffffff';
  };

  return (
    <div className="home-page">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles-background"
      />
      <div className="background-overlay">
        <div className="content-container">
          <div className="profile-image-placeholder">
            <img src={`${process.env.PUBLIC_URL}/profile_img.jpeg`} alt="Profile" />
          </div>
          <h2>Hi, I am George 👋</h2>
          
          <section className="ai-section">
            <div>
              <p>💻 Software Engineer with a strong background in Robotics and Artificial Intelligence, along with solid experience in web development.</p>
              <p>⚡ Passionate about building reliable, safe, and scalable intelligent systems, with clean and maintainable code.</p>
            </div>
          </section>

          <div className="programming-skills">
              <SiPython size={50} color="#3776AB" />
              <SiCplusplus size={50} color="#00599C" />
              <SiC size={50} color="#A8B9CC" />
              <FaJava size={50} color="#007396" />
          </div>

          <div className="navigation-buttons-container">
            <div className="navigation-buttons">
              <button 
                className="demos-button" 
                onClick={goToDemos}
              >
                Projects
              </button>
            </div>
          </div>

          <div className="contact-links-section">
            <p>Contact Links:</p>
            <div>
              <a 
                href="https://github.com/Stam21" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaGithub 
                  size={30} 
                  style={contactIconStyle} 
                  onMouseOver={handleIconHover}
                  onMouseOut={handleIconLeave}
                />
              </a>
              <a 
                href="https://www.linkedin.com/in/george-stam/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedin 
                  size={30} 
                  style={contactIconStyle} 
                  onMouseOver={handleIconHover}
                  onMouseOut={handleIconLeave}
                />
              </a>
              <a 
                href="mailto:george.stamatopoulos1998@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiGmail 
                  size={30} 
                  style={contactIconStyle} 
                  onMouseOver={handleIconHover}
                  onMouseOut={handleIconLeave}
                />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;