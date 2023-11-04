import { createBrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <HomePage />
      </>
    ),
  },
  {
    path: '*',
    element: (
      <div>
        Are you lost?
        <br />
        <a href='/'>Go back home</a>
      </div>
    ),
  },
]);

export default router;
