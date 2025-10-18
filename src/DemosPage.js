import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './DemosPage.css';

function DemosPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const goHome = () => {
    navigate('/');
  };

  const projects = [
    {
      id: 1,
      videoId: "zfw4zUL8LG4",
      title: "3D Gaussian Splatting",
      description: "A generated 3D point cloud of a room was processed using Gaussian splatting to reconstruct the space in Unity. This project demonstrates 3D reconstruction, and interactive visualization "
    },
    {
      id: 2,
      videoId: "eJhGhpe4Ggg",
      title: "Robotic Arm Control",
      description: "Robotic arm trying to point to specific smarties based on the color given by the user. Algorithms were written for inverse kinematics and trajectory planning. OpenCV was used for the computer vision task. "
    },
    {
      id: 3,
      videoId: "jMquftWSCgU",
      title: "AI-Generated Stories for Children",
      description: "A web application that uses Langchain to orchestrate several AI models and generate text, audio and images, resulting in a cool story for kids."
    },
    {
      id: 4,
      videoId: "Xi3jABvI3mo",
      title: "Autonomous Robot",
      description: "The robot of the video, named Aksel, carried out several tasks of the RoboCup competition. The robot is controlled via a teensy board and utilizes a distance sensor, a light sensor, a camera, and an imu to navigate autonomously."
    },
    {
      id: 5,
      videoId: "d3z0ypKGsK4",
      title: "Perception using YOLO",
      description: "The purpose of this model is to identify pedestrians, cars and cyclists but also perform state estimation based on Kalman filter."
    },
    {
      id: 6,
      videoId: "f4gmtfiQq7E",
      title: "Autonomous Paraglider",
      description: "This is a small paraglider from HackerMotors that was refined with additional hardware with the end goal of navigating autonomously. The video shows the drone autonomously doing a loiter mission and also gives a glimpse in the simulation developed for testing purposes."
    },
    {
      id: 7,
      videoId: "ZrKZAOroLDM",
      title: "Chess AI",
      description: "A chess game developed with python playing against AI. AI is implemented using minimax algorithm with alpha-beta pruning."
    },
    {
      id: 8,
      videoId: "36Ewd6-lDUE",
      title: "Computer Graphics in WebGL",
      description: "A collection of exercises in WebGL to demonstrate concepts in computer graphics."
    },
    {
      id: 9,
      videoId: "axHgCTimmR4",
      title: "AI in multi-agent systems",
      description: "A Java application in which path finding algorithms are explored in multi agent scenarios. Conflict-based search, hungarian algorithm, A*, dijkstra are all relevant in this project."
    },
    {
      id: 10,
      videoId: "YwPug2SWGcI",
      title: "Space Adventures",
      description: "A finished version of the stratego board game in space with the star wars characters and one space shooter game under development. Both games are using the SGG graphics library."
    },
    {
      id: 11,
      videos: [
        { videoId: "Rfu4u2AlDwE", isShort: true },
        { videoId: "rmBdzcwk1u0", isShort: true }
      ],
      title: "Crazyflie Autonomous Flight",
      description: "In the first video, a Crazyflie quadcopter is used to practice the A* path finding algorithm and navigate inside a 3D maze. In the second video, it is using a custom position and attitude controller and uses position data from Optitrack to autonomously pass through the hoops"
    }
  ];

  const itemsPerPage = 3;
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const getCurrentProjects = () => {
    const start = currentIndex * itemsPerPage;
    return projects.slice(start, start + itemsPerPage);
  };

  return (
    <div className="demos-page">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="particles-background"
      />
      <div className="background-overlay">
        <div className="content-container">
          <button 
            className="home-button-top" 
            onClick={goHome}
          >
            <FaHome size={24} />
            Home
          </button>

          <h1>Projects</h1>
          
          <div className="carousel-container">
            <button className="carousel-arrow left" onClick={handlePrev}>
              <FaArrowLeft size={30} />
            </button>

            <div className="carousel-content">
              {getCurrentProjects().map((project) => (
                <div key={project.id} className="project-card">
                  {project.videos ? (
                    <div className="dual-video-container">
                      {project.videos.map((video, idx) => (
                        <iframe 
                          key={idx}
                          src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&hd=1`}
                          title={`${project.title} - Part ${idx + 1}`}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  ) : (
                    <iframe 
                      src={`https://www.youtube.com/embed/${project.videoId}?rel=0&modestbranding=1&hd=1`}
                      title={project.title}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  )}
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="carousel-arrow right" onClick={handleNext}>
              <FaArrowRight size={30} />
            </button>
          </div>

          <div className="carousel-dots">
            {[...Array(totalPages)].map((_, idx) => (
              <span 
                key={idx}
                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              ></span>
            ))}
          </div>

          <div className="carousel-counter">
            Page {currentIndex + 1} of {totalPages}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemosPage;