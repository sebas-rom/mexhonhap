import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loading } from '@ui/weblibs';
// import NotFound404 from '../pages/NotFound404';
import './app.css';
// import Home from '../pages/Home';
// import ExploreMore from '../pages/ExploreMore';
const Home = lazy(() => import('../pages/Home'));
// const ExploreMore = lazy(() => import('../pages/ExploreMore'));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/explore-more" element={<ExploreMore />}></Route> */}
          {/* <Route path="*" element={<NotFound404 />}></Route> */}
        </Routes>
      </Suspense>
      {/* <Footer /> */}
    </>
  );
}

export default App;
