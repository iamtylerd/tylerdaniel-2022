import Link from "next/link";
import { localWordpressUrl } from '../configs/urls';
import Sidebar from '../components/sidebar';
import styles from '../styles/blog.module.scss';

export default function Blog(props) {
  const { posts } = props;
  return (
    <div className={styles.container}>
      <Sidebar posts={posts} location="blog" />
      <div className={styles["blog-posts-container"]}>
        <h1 className={styles["blog-posts-header"]}>Blog</h1>
        <ul className={styles["blog-posts-list"]}>
          {
            posts.nodes.map((post) => {
              return (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
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
          posts(where: {categoryName: "blog"}) {
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