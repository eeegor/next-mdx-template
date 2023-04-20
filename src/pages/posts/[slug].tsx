import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import {
  getAllPostsPath,
  getPostData,
  getPostsMetaData,
} from "../../lib/getPostsData";
import { MDXComponents } from "../../components/MDX";
import { Layout } from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { books } from "@/data/books";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const Blog = ({ navigation, postContent, slug, meta }) => {
  const currentPostIndex = navigation.map((post) => post.slug).indexOf(slug);
  const nextPost =
    currentPostIndex < navigation.length - 1
      ? navigation[currentPostIndex + 1]
      : navigation[0];
  const prevPost =
    currentPostIndex > 0
      ? navigation[currentPostIndex - 1]
      : navigation[navigation.length - 1];

  return (
    <div>
      <Head>
        <title>{meta.metadata.title}</title>
      </Head>
      <Layout>
        <div className="w-full h-96 relative mb-8">
          <Image
            src={
              meta.metadata.socialImage
                ? meta.metadata.socialImage
                : "http://placehold.it/600x400"
            }
            alt=""
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="prose max-w-none">
          <h1>{meta.metadata.title}</h1>
          <MDXRemote
            {...postContent}
            components={MDXComponents}
            scope={{ books }}
          />
        </div>
        <div className="py-12">
          <span className="flex">
            <Link className="flex items-center gap-4" href={prevPost.slug}>
              <IoArrowBack /><span>Prev</span>
            </Link>
            <Link className="ml-auto flex items-center gap-4" href={nextPost.slug}>
              <span>Next</span><IoArrowForward />
            </Link>
          </span>
        </div>
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostsPath();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.slug);
  const postContent = await serialize(postData.content);
  const navigation = getPostsMetaData();
  return {
    props: {
      navigation,
      postContent,
      slug: params.slug,
      meta: postData,
    },
  };
}

export default Blog;
