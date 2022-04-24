import PostsContainer from './PostsContainer';

export default function Feed() {
  return (
    <div className="flex-grow h-screen pb-44 mr-4 xl:mr-40 overflow-y-auto">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <PostsContainer />
      </div>
    </div>
  );
}
