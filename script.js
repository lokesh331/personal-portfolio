// portfolio.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully!');
    
    // Initialize all features
    initSmoothScrolling();
    initSkillAnimation();
    initProjectDetails();
    initContactForm();
    initThemeToggle();
    initMobileMenu();
    initTypewriterEffect();
});

// 1. Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 2. Animate Skills on Scroll
function initSkillAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillItems = document.querySelectorAll('#skills li');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
        
        // Set initial state
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s, transform 0.5s';
        });
    }
}

// 3. Project Details Expansion
function initProjectDetails() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('click', function() {
            this.classList.toggle('expanded');
            
            // Create or show details
            let details = this.querySelector('.project-details');
            
            if (!details) {
                details = document.createElement('div');
                details.className = 'project-details';
                details.innerHTML = `
                    <h4>Technologies Used:</h4>
                    <p>HTML, CSS, JavaScript</p>
                    <a href="#" class="demo-link">View Demo</a>
                    <a href="#" class="code-link">View Code</a>
                `;
                this.appendChild(details);
                
                // Add event listeners for new links
                details.querySelector('.demo-link').addEventListener('click', (e) => {
                    e.stopPropagation();
                    alert('Demo link would open here!');
                });
                
                details.querySelector('.code-link').addEventListener('click', (e) => {
                    e.stopPropagation();
                    alert('GitHub link would open here!');
                });
            }
            
            details.style.display = details.style.display === 'block' ? 'none' : 'block';
        });
    });
}

// 4. Contact Form (if added to HTML later)
function initContactForm() {
    // Check if contact form exists, if not create one
    const contactSection = document.getElementById('contact');
    const existingForm = contactSection.querySelector('form');
    
    if (!existingForm) {
        const form = document.createElement('form');
        form.id = 'contact-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit">Send Message</button>
        `;
        
        // Insert form before the existing contact info
        const contactInfo = contactSection.querySelector('p');
        contactSection.insertBefore(form, contactInfo);
        
        // Add form submit handler
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.name.value,
                email: this.email.value,
                message: this.message.value
            };
            
            console.log('Form submitted:', formData);
            alert('Thank you for your message! This is a demo - in a real site, this would send an email.');
            
            // Reset form
            this.reset();
        });
    }
}

// 5. Theme Toggle
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Toggle Dark Mode';
    
    // Add to header
    const header = document.querySelector('header');
    header.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '☀️';
    }
}

// 6. Mobile Menu Toggle
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const menuToggle = document.createElement('button');
    menuToggle.id = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.title = 'Menu';
    
    // Insert before nav
    nav.parentNode.insertBefore(menuToggle, nav);
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') ? '✕' : '☰';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.innerHTML = '☰';
        }
    });
}

// 7. Typewriter Effect for Header
function initTypewriterEffect() {
    const headerSubtitle = document.querySelector('header p');
    const originalText = headerSubtitle.textContent;
    const newText = "Web Developer | Student | Creative Problem Solver";
    
    headerSubtitle.textContent = "";
    headerSubtitle.style.borderRight = "2px solid white";
    
    let i = 0;
    const typingSpeed = 100;
    
    function typeWriter() {
        if (i < newText.length) {
            headerSubtitle.textContent += newText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Blinking cursor effect
            setInterval(() => {
                headerSubtitle.style.borderRightColor = 
                    headerSubtitle.style.borderRightColor === 'transparent' ? 'white' : 'transparent';
            }, 500);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeWriter, 1000);
}

// 8. Current Year in Footer
function updateFooterYear() {
    const footer = document.querySelector('footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `© ${currentYear} Lokesh Sunkari`;
    }
}

// Call the function
updateFooterYear();

// 9. Add CSS for JS-generated elements
const style = document.createElement('style');
style.textContent = `
    .project.expanded {
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .project-details {
        display: none;
        margin-top: 10px;
        padding: 10px;
        background: #f9f9f9;
        border-radius: 5px;
    }
    
    .demo-link, .code-link {
        display: inline-block;
        margin: 5px 10px 5px 0;
        padding: 5px 10px;
        background: #333;
        color: white;
        text-decoration: none;
        border-radius: 3px;
    }
    
    .demo-link:hover, .code-link:hover {
        background: #555;
    }
    
    #contact-form {
        margin-bottom: 20px;
    }
    
    .form-group {
        margin-bottom: 15px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    }
    
    button[type="submit"] {
        background: #333;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button[type="submit"]:hover {
        background: #555;
    }
    
    #theme-toggle {
        position: absolute;
        top: 20px;
        right: 20px;
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }
    
    #mobile-menu-toggle {
        display: none;
        position: fixed;
        top: 20px;
        left: 20px;
        z-index: 1000;
        background: #333;
        color: white;
        border: none;
        padding: 10px;
        font-size: 1.2em;
        cursor: pointer;
        border-radius: 4px;
    }
    
    body.dark-mode {
        background-color: #1a1a1a;
        color: #f0f0f0;
    }
    
    body.dark-mode header,
    body.dark-mode footer {
        background-color: #222;
    }
    
    body.dark-mode nav {
        background-color: #333;
    }
    
    body.dark-mode section {
        background-color: #2a2a2a;
        color: #f0f0f0;
    }
    
    body.dark-mode .project {
        background-color: #3a3a3a;
    }
    
    @media (max-width: 768px) {
        #mobile-menu-toggle {
            display: block;
        }
        
        nav {
            display: none;
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            background: #555;
            z-index: 999;
        }
        
        nav.active {
            display: flex;
            flex-direction: column;
        }
        
        nav a {
            padding: 15px;
            margin: 0;
            border-bottom: 1px solid #666;
        }
    }
`;

document.head.appendChild(style);