import Link from "next/link";
import { localWordpressUrl } from '../configs/urls';
import Sidebar from '../components/sidebar';
import styles from '../styles/photos.module.scss';

export default function Photos(props) {
  const { posts } = props;
  return (
    <div className={styles.container}>
      <Sidebar posts={posts} location="photos" />
      <div className={styles["photos-posts-container"]}>
        <h1 className={styles["photos-posts-header"]}>Photos</h1>
        <ul className={styles["photos-posts-list"]}>
          {
            posts.nodes.map((post) => {
              return (
                <li key={post.slug}>
                  <Link href={`/photos/${post.slug}`}>{post.title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(localWordpressUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts(where: {categoryName: "photos"}) {
            nodes {
              slug
              content
              title
            }
          }
        }
      `,
    })
  });

  const json = await res.json();
  return {
    props: {
      posts: json.data.posts,
    }
  };
}

