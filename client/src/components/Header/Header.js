import React from 'react';
import styles from './Header.module.css';
import { Route, Switch, NavLink, Link } from 'react-router-dom'


function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.subHeader}>
        <Link className={styles.smallTitle} to="/">Ri`vyoo</Link>
        <div>
          <Link to="/new-review" className={styles.addReviewButton}>Add Review</Link>
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.bannerTitle}>Ri`vyoo</h1>
        <p className={styles.bannerSubtitle}>A place to share your opinion.</p>
      </div>
    </div>
  );
}

export default Header;