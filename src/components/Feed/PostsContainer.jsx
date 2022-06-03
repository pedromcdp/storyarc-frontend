import { motion, AnimateSharedLayout } from 'framer-motion';
import Post from '../Post';

export default function PostsContainer({ data }) {
  return (
    <AnimateSharedLayout>
      <motion.div layout className="pb-32">
        {Array.isArray(data) ? (
          data.map((post) => (
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
          ))
        ) : (
          <Post
            id={data._id}
            username={data.user.name}
            avatar={data.user.avatar}
            timestamp={data.createdAt}
            description={data.description}
            image={data.photo}
            newImage={data.newPhoto}
          />
        )}
      </motion.div>
    </AnimateSharedLayout>
  );
}
