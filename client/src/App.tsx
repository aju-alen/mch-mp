import { useEffect } from 'react';
import { createBrowserRouter, BrowserRouter as Router, Routes, Route,RouterProvider, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PlatformPage from './pages/Platform';
import NewsPage from './pages/NewsPage';
import Upcomingprojectspage from './pages/UpcomingProjectsPage';
import GaleryPage from './pages/GaleryPage';
import VolunteerPage from './pages/VolunteerPage';
import SocialLinks from './components/SocialLinks';
import Contribute from './pages/Contribute';
import SingleNews from './pages/SingleNews';
import { initGA, logPageView } from './utils/google-analytics'

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <RouteChangeTracker />
        <Outlet />
      </main>
      <SocialLinks />
      <Footer />
    </div>
  );
};

function App() {
  useEffect(() => {
    initGA(); // Initialize once on app load
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "platform", element: <PlatformPage /> },
        { path: "news", element: <NewsPage /> },
        { path: "upcoming-projects", element: <Upcomingprojectspage /> },
        { path: "gallery", element: <GaleryPage /> },
        { path: "get-involved", element: <VolunteerPage /> },
        { path: "contribute", element: <Contribute /> },
        { path: "news/:id", element: <SingleNews /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;