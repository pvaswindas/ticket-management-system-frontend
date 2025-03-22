import { useEffect } from 'react';
import { Routes } from "./routes/router";

function App() {
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--color-github-dark, #0D1117)';
    
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return <Routes />;
}

export default App;