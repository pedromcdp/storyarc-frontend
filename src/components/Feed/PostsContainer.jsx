import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroller';
import Post from '../Post';
import Loading from '../Loading';

export default function PostsContainer({ data, hasNextPage, fetchNextPage }) {
  return (
    <motion.div layout className="">
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Loading size={'xs'} />}
        useWindow={false}
        threshold={450}
        getScrollParent={() => document.getElementById('scrollparent')}
      >
        {data?.pages.map((page) =>
          page?.data.map((post) => (
            <Post
              key={post._id}
              id={post._id}
              username={post.user.name}
              avatar={post.user.avatar}
              timestamp={post.createdAt}
              description={post.description}
              image={post.photo}
              newImage={post.newPhoto}
            />
          )),
        )}
      </InfiniteScroll>
      {!hasNextPage && (
        <div className="flex justify-center py-5 mb-20 text-sm text-verde md:mb-5 md:text-normal">
          <p>Não temos mais publicações de momento para mostrar.</p>
        </div>
      )}
    </motion.div>
  );
}
