import Comments from '../../components/comments'
import Home from '../../components/icons/home'
import Layout from '../../components/layout'
import Markdown from '../../components/markdown'
import Reactions from '../../components/reactions'
import Theme from '../../components/theme'
import { fetchPaths, fetchPost, formatDate } from '../../lib'

import Link from 'next/link'

import type { NextPageWithLayout, Post } from 'gossip'

const PostDetail: NextPageWithLayout<{ post: Post }> = ({ post }) => (
  <div className="my-10 sm:my-20 font-zh">
    <div className="flex flex-row justify-between mb-5">

      <div className="flex flex-col items-start">
        <div className="text-4xl sm:text-5xl font-bold dark:text-gray-200">
          {post.title}
        </div>
        <div className="sm:text-lg text-sm dark:text-gray-400">
          <span>{post.author}</span> /&nbsp;
          <span>{formatDate(post.created_at)}</span> /&nbsp;
          <span>{formatDate(post.updated_at)}</span>
        </div>
      </div>

      <div className="text-sm sm:text-lg self-center flex flex-row space-x-2 sm:space-x-5">
        <Home width="2em" height="2em" />
        <Theme />
      </div>

    </div>

    {
      post.reactions.total_count > 0
        && <Reactions
          id={post.id}
          nice={post.reactions['+1']}
          bad={post.reactions['-1']}
          hooray={post.reactions.hooray}
          rocket={post.reactions.rocket}
          eyes={post.reactions.eyes}
          laugh={post.reactions.laugh}
          confused={post.reactions.confused}
          heart={post.reactions.heart}
        />
    }

    <Markdown className="font-normal">
      {post.content}
    </Markdown>

    <Comments issueNumber={post.id} />

    <Link href="/">
      <a className="float-right mt-10 sm:text-2xl text-xl text-gray-500 hover:text-black hover:underline hover:underline-offset-4 transition-all dark:text-gray-400 dark:hover:text-gray-100">cd ..</a>
    </Link>
  </div>
)

PostDetail.getLayout = page => <Layout middle={page} />

// get all the posts id from the github issues
export const getStaticPaths = async () => ({
  paths: await fetchPaths(),
  fallback: false,
})

export const getStaticProps = async ({ params }: { params: { id: string } }) => {
  const { id } = params

  const post = await fetchPost(id)

  return {
    props: {
      post,
    },
  }
}

export default PostDetail
