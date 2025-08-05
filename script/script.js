document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMenuButton = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  mobileMenuButton.addEventListener('click', function() {
    mobileMenu.classList.add('active');
  });

  closeMenuButton.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
  });

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });

  // Time-based Greeting
  const greeting = document.getElementById('greeting');
  const hour = new Date().getHours();
  let greetingText = 'Good ';

  if (hour >= 5 && hour < 12) {
    greetingText += 'Morning';
  } else if (hour >= 12 && hour < 18) {
    greetingText += 'Afternoon';
  } else {
    greetingText += 'Evening';
  }

  greeting.textContent = `${greetingText}, I'm`;

  // Typewriter Effect
  const typewriterElement = document.getElementById('typewriter');
  const phrases = [
    'B.Tech AI/ML Student',
    'Full-Stack Developer',
    'Nitro Pro Developer',
    'AI Enthusiast'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(typeWriter, typingSpeed);
  }

  setTimeout(typeWriter, 1000);

  // Custom Cursor
  const cursor = document.getElementById('custom-cursor');

  document.addEventListener('mousemove', function(e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.addEventListener('mousedown', function() {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
  });

  document.addEventListener('mouseup', function() {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });

  // Hover Effects for Links
  const links = document.querySelectorAll('a, button');

  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.backgroundColor = 'rgba(93, 0, 255, 0.5)';
    });

    link.addEventListener('mouseleave', function() {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.backgroundColor = 'rgba(255, 0, 85, 0.5)';
    });
  });

  // Ripple Effect
  const rippleButtons = document.querySelectorAll('button, .social-link');

  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.remove('opacity-100', 'visible');
      backToTopButton.classList.add('opacity-0', 'invisible');
    }
  });

  backToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Scroll Progress Bar
  const progressBar = document.getElementById('progress-bar');

  window.addEventListener('scroll', function() {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  let isDarkTheme = true;

  themeToggle.addEventListener('click', function() {
    if (isDarkTheme) {
      document.body.style.backgroundColor = '#f0f0f0';
      document.body.style.color = '#0a0a0a';
      themeIcon.classList.remove('ri-sun-line');
      themeIcon.classList.add('ri-moon-line');
      themeIcon.style.color = '#0a0a0a';
      isDarkTheme = false;
    } else {
      document.body.style.backgroundColor = '#0a0a0a';
      document.body.style.color = '#f0f0f0';
      themeIcon.classList.remove('ri-moon-line');
      themeIcon.classList.add('ri-sun-line');
      themeIcon.style.color = '#f0f0f0';
      isDarkTheme = true;
    }
  });

  // Contact Form Submission with AJAX for Formspree
  const contactForm = document.getElementById('contact-form');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML; // Store original button content

  async function handleFormSubmit(event) {
    event.preventDefault(); // Keep this to prevent default redirect
    const form = event.target;
    const data = new FormData(form);

    // Update button state to show submission is in progress
    submitButton.innerHTML = 'Sending... <i class="ri-loader-4-line animate-spin ml-1"></i>';
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success!
        submitButton.innerHTML = 'Message Sent! <i class="ri-check-line ml-1"></i>';
        form.reset(); // Clear the form fields
        setTimeout(() => {
          submitButton.innerHTML = originalButtonText; // Reset button text
          submitButton.disabled = false;
        }, 3000); // Reset after 3 seconds
      } else {
        // Handle server errors (e.g., Formspree is down)
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      // Handle submission errors (e.g., no internet)
      console.error('Submission error:', error);
      submitButton.innerHTML = 'Error Sending <i class="ri-close-line ml-1"></i>';
      setTimeout(() => {
        submitButton.innerHTML = originalButtonText; // Reset button text
        submitButton.disabled = false;
      }, 3000); // Reset after 3 seconds
    }
  }

  contactForm.addEventListener("submit", handleFormSubmit);

  // Particles.js Configuration
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#ff0055", "#5d00ff"]
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#5d00ff",
        "opacity": 0.2,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 0.8
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Three.js Background
  const container = document.getElementById('canvas-container');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create geometric shapes
  const geometries = [
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0)
  ];

  const material = new THREE.MeshBasicMaterial({
    color: 0x5d00ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });

  const objects = [];

  for (let i = 0; i < 10; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;

    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;

    mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 0.5 + 0.5;

    scene.add(mesh);
    objects.push(mesh);
  }

  function animate() {
    requestAnimationFrame(animate);

    objects.forEach(obj => {
      obj.rotation.x += 0.003;
      obj.rotation.y += 0.003;
    });

    renderer.render(scene, camera);
  }

  animate();

  // Handle window resize
  window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
