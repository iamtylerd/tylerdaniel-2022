// import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import Sidebar from '../../components/sidebar';
import { localWordpressUrl } from '../../configs/urls';
// to fix local import for dynamic file
// import '../../styles/slug.scss';

export default function Post(props) {
  const { post, posts } = props;
  const router = useRouter();
  return (
    <div className="container" >
      <Sidebar location="photos" posts={posts} />
      <div className="post-container">
        <span className="post-button--back" id="post-top-anchor" onClick={() => router.back()}>back</span>
          <div className="post-div">
          <h1>{post.title}</h1>
          <article className="post-article" dangerouslySetInnerHTML={{__html: post.content}} />
          </div>
        <span className="post-go-up" onClick={() => window.scrollTo(0, 0)}>☝️</span>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {

  const res = await fetch(localWordpressUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query SinglePost($id: ID!, $idType: PostIdType!) {
          post(id: $id, idType: $idType) {
            title
            slug
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      `,
      variables: {
        id: context.params.slug,
        idType: 'SLUG',
      }
    })
  });

  const resSidebar = await fetch(localWordpressUrl, {
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

  const resSidebarJson = await resSidebar.json();
  return {
    props: {
      post: json.data.post,
      posts: resSidebarJson.data.posts,
    }
  };
}

export async function getStaticPaths() {
  const res = await fetch(localWordpressUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        query AllPostsQuery {
          posts {
            nodes {
              slug
              content
              title
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      `,
    })
  });

  const json = await res.json();
  const posts = json.data.posts.nodes;
  const paths = posts.map((post) => ({ params: { slug: post.slug }}));
  return {
    paths,
    fallback: false,
  }

}