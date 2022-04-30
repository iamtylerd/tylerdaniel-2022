import Link from "next/link";
import styles from '../styles/index.module.scss';

export default function Home(props) {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-logo-container"]}>
        <span className={styles["home-logo-main-letter-t"]}>T</span>
        <span className={styles["home-logo-split-letter"]}>x</span>
        <span className={styles["home-logo-main-letter-d"]}>D</span>
      </div>
      <div className={styles["home-left-container"]}>
        <Link href="/blog" passHref>
          <button className={styles["home-button-blog"]}>
            Blog
          </button>
        </Link>
      </div>
      <div className={styles["home-right-container"]}>
        <Link href="/photos" passHref>
          <button className={styles["home-button-photo"]}>
            Photos
          </button>
        </Link>
      </div>
    </div>
  )
}

