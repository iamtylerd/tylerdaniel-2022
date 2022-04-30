import Link from "next/link";
import styles from '../styles/sidebar.module.scss';
import PropTypes from 'prop-types'; 

export default function Sidebar(props) {
  const { location, posts } = props;
  return (
    <div className={styles.container}>
        <Link href="/">
          <div className={styles["sidebar-logo-container"]}>
            <span className={styles["sidebar-logo-main-letter-t"]}>T</span>
            <span className={styles["sidebar-logo-split-letter"]}>x</span>
            <span className={styles["sidebar-logo-main-letter-d"]}>D</span>
          </div>
        </Link>
      <div className={styles["posts-container"]}>
          <ul className={styles["posts-list"]}>
          {
            posts.nodes.map((post) => {
              return (
                <li className={styles["post-link"]} key={post.slug}>
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className={styles["footer-container"]}>
          <div className={styles["footer-links-container"]}>
            <Link href="/photos">photos</Link>
            <Link href="/about">about</Link>
            <Link href="/contact">contact</Link>
          </div>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  location: PropTypes.string.isRequired,
  posts: PropTypes.objectOf(PropTypes.array),
}

Sidebar.defaultProps = {
  posts: {
    nodes: []
  },
}