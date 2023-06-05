import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Layout from './Layout';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import AddEventForm from './pages/AddEventForm';
import AdPage from './pages/AdPage';
import WishlistPage from './pages/WishlistPage';
import MyAds from './pages/MyAds';

const App = () => {

  const [progress, setProgress] = useState(0);
  <LoadingBar
    color="#8F00FF"
    height={4}
    progress={progress}
  />

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home  setProgress={setProgress}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/create' element={<AddEventForm />} />
        <Route path='/item/:id' element={<AdPage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/myevents' element={<MyAds />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    </Routes>
  );
};

export default App;
