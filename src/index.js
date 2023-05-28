import { render } from 'react-dom'
import App from './App'
import { ThemeProvider } from './contexts/theme'
import './index.css'

// window.addEventListener('error', (e) => {
//     let error = e.error;
//     if (!(error instanceof ResizeObserver)) {
//         throw error;
//     }
// });

render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
)
