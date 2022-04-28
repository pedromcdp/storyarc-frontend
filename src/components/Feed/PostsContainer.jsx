import { motion, AnimateSharedLayout } from 'framer-motion';
import Post from '../Post';

const dummydata = {
  user: {
    username: 'Pedro Miguel Pereira',
    avatar:
      'https://lh3.googleusercontent.com/a-/AOh14Gh6dfOfIa2bIeA9aMRA1ENG9A36mKbPZFMkr_CCww=s96-c',
  },
  description: 'Dummy description',
  timestamp: '2020-05-20T12:00:00.000Z',
  image:
    'https://images.unsplash.com/photo-1589717085666-b9f9f8f8d8b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
  likes: 0,
  comments: 0,
  shares: 0,
  views: 0,
  tags: ['tag1', 'tag2', 'tag3'],
};

export default function PostsContainer() {
  return (
    <AnimateSharedLayout>
      <motion.div layout className="pb-32">
        {[...Array(10)].map((_, i) => (
          <Post
            key={i}
            id={i}
            username={dummydata.user.username}
            avatar={dummydata.user.avatar}
            timestamp={dummydata.timestamp}
            description={dummydata.description}
          />
        ))}
      </motion.div>
    </AnimateSharedLayout>
  );
}
