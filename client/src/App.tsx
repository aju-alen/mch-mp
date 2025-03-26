import { createBrowserRouter, BrowserRouter as Router, Routes, Route,RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/Platform';
import NewsPage from './pages/NewsPage';
import Upcomingprojectspage from './pages/Upcomingprojectspage';
import GaleryPage from './pages/GaleryPage';
import VolunteerPage from './pages/VolunteerPage';

function App() {

  const Layout = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
        <Outlet  />
      </main>
      {/* <Footer /> */}
    </div>
    );
  };

  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "platform",
        element: <PlatformPage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "upcoming-projects",
        element: <Upcomingprojectspage />,
      },
      {
        path: "gallery",
        element: <GaleryPage />,
      },
      {
        path: "volunteer",
        element: <VolunteerPage />,
      },
    ]
  }]);
  return <RouterProvider router={router} />;
}

export default App;

