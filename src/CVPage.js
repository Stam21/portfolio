import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './CVPage.css';

// Set up the worker with https
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function CVPage() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);
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

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    console.log('PDF loaded successfully with', numPages, 'pages');
  }

  function onDocumentLoadError(error) {
    console.error('Error loading PDF:', error);
  }

  const goToHome = () => {
    navigate('/');
  };

  // Enable scrolling for CV page
  React.useEffect(() => {
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
    
    return () => {
      // Cleanup is handled by individual pages
    };
  }, []);

  return (
    <div className="cv-page-container">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="cv-particles"
      />
      <button 
        className="cv-home-button"
        onClick={goToHome}
      >
        <FaHome size={window.innerWidth <= 768 ? 16 : 24} />
        Home
      </button>

      <Document
        file={`${process.env.PUBLIC_URL}/CV.pdf`}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
        options={{
          cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        }}
        loading={
          <div style={{ color: 'white', fontSize: '18px', zIndex: 10, position: 'relative' }}>
            Loading PDF...
          </div>
        }
        error={
          <div style={{ color: 'white', textAlign: 'center', zIndex: 10, position: 'relative' }}>
            <p>Failed to load PDF.</p>
            <a 
              href="/CV.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#4a9eff', textDecoration: 'underline' }}
            >
              Click here to open PDF in new tab
            </a>
          </div>
        }
        className="cv-document-container"
      >
        <Page 
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          width={Math.min(window.innerWidth - 40, 1200)}
        />
      </Document>
      
      {numPages && (
        <div className="cv-page-info">
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      )}
    </div>
  );
}

export default CVPage;