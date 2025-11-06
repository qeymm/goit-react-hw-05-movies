import { Loader } from 'components/Loader/Loader';
import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router';
import styles from './SharedLayout.module.css';

export const SharedLayout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.bar}>
          <div className={styles.brand}>CineScope</div>
          <nav className={styles.nav}>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>
              Home
            </NavLink>
            <NavLink to="/movies" className={({ isActive }) => isActive ? `${styles.link} ${styles.linkActive}` : styles.link}>
              Movies
            </NavLink>
          </nav>
        </div>
      </header>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
