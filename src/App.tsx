import { createBrowserRouter, BrowserRouter as Router, Routes, Route,RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

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
    ]
  }]);
  return <RouterProvider router={router} />;
}

export default App;

