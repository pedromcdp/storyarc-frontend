import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroller';
import Post from '../Post';
import Loading from '../Loading';

export default function PostsContainer({ data, hasNextPage, fetchNextPage }) {
  return (
    <motion.div layout className="pb-24 xl:pb-0">
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Loading key={0} size={'xs'} />}
        useWindow={false}
        threshold={450}
        getScrollParent={() => document.getElementById('scrollparent')}
      >
        {data?.pages.map((page) =>
          page?.data.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              uid={post.user._id}
              username={post.user.name}
              avatar={post.user.avatar}
              timestamp={post.createdAt}
              description={post.description}
              image={post.photo}
              newImage={post.newPhoto}
              likes={post.likes}
              comments={post.comments}
            />
          )),
        )}
      </InfiniteScroll>
      {!hasNextPage && (
        <div className="md:text-normal mb-20 py-5 text-center text-sm text-verde md:mb-5">
          <p>Não temos mais publicações de momento para mostrar.</p>
        </div>
      )}
    </motion.div>
  );
}
