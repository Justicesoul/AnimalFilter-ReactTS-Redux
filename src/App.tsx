import { useEffect, useState } from 'react';
import Form from './components/form';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Main from './pages/Main';
import Translations from './pages/Translations';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/translations" element={<Translations />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
