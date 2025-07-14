import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Inline critical CSS for above-the-fold content
    const criticalStyles = `
      /* Critical font loading */
      @font-face {
        font-family: 'Wilkysta';
        src: url('/fonts/Wilkysta.woff2') format('woff2'),
             url('/fonts/Wilkysta.woff') format('woff');
        font-display: swap;
        font-weight: normal;
        font-style: normal;
      }
      
      /* Critical layout styles */
      .hero-gradient {
        background: linear-gradient(135deg, 
          hsl(var(--background)) 0%, 
          hsl(var(--muted)) 50%, 
          hsl(var(--background)) 100%);
      }
      
      .gradient-text {
        background: linear-gradient(135deg, 
          hsl(var(--primary)) 0%, 
          hsl(var(--accent)) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      /* Critical button styles */
      .btn-primary {
        background: linear-gradient(135deg, 
          hsl(var(--primary)) 0%, 
          hsl(var(--primary-foreground)) 100%);
        transition: transform 0.2s ease;
      }
      
      .btn-primary:hover {
        transform: translateY(-2px);
      }
    `;

    // Only add if not already present
    if (!document.querySelector('#critical-css')) {
      const styleElement = document.createElement('style');
      styleElement.id = 'critical-css';
      styleElement.textContent = criticalStyles;
      document.head.appendChild(styleElement);
    }
  }, []);

  return null;
};

export default CriticalCSS;