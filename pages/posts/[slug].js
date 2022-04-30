// import Image from 'next/image';
import { useRouter } from 'next/dist/client/router';
import { localWordpressUrl } from '../../configs/urls';
// to fix local import for dynamic file
// import '../../styles/slug.scss';

export default function Post(props) {
  const { post } = props;
  const router = useRouter();
  return (
    <div>
      <span className="post-button--back" id="post-top-anchor" onClick={() => router.back()}>back</span>
      <div className="post-container">
        <h1>{post.title}</h1>
        {/* {post.featuredImage && <Image width="640" height="426" src={post.featuredImage?.node.sourceUrl} alt="" />} */}
        <article className="post-article" dangerouslySetInnerHTML={{__html: post.content}} />
      </div>
      <span className="post-go-up" onClick={() => window.scrollTo(0, 0)}>☝️</span>
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

  const json = await res.json();
  return {
    props: {
      post: json.data.post,
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