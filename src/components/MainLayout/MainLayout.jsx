import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header';
import Sidebar from 'components/Sidebar/Sidebar';
import css from './mainLayout.module.scss';

const MainLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const toggleSidebar = () => {
   setOpenSidebar(!openSidebar);
 };

  return (
    <>
      <div className={openSidebar ? `${css.sidebar} ${css.active}` : css.sidebar}>
        <Sidebar openSidebar={toggleSidebar} />
      </div>
      
      <div className={css.context}>
        <Header openSidebar={toggleSidebar} />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
