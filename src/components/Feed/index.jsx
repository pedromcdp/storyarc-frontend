import FeedFilter from '../FeedFilter';
import PostsContainer from './PostsContainer';

export default function Feed() {
  return (
    <div className="overflow-y-auto grow pb-44 h-screen xl:mr-40">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <FeedFilter />
        <PostsContainer />
      </div>
    </div>
  );
}
