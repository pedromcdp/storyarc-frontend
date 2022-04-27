import FeedFilter from '../FeedFilter';
import PostsContainer from './PostsContainer';
import Footer from '../Footer';

export default function Feed() {
  return (
    <div className="overflow-y-auto grow scroll-smooth xl:flex xl:flex-row xl:justify-center xl:mx-auto xl:space-x-4 xl:w-full">
      <div className="grow mx-auto max-w-md h-screen md:max-w-lg lg:max-w-2xl xl:mx-0">
        <FeedFilter />
        <PostsContainer />
      </div>
      <div className="hidden top-5 grow mt-5 max-w-xs xl:block xl:sticky">
        <div className="xl:max-w-xs">
          <div className="p-5 bg-verde rounded-xl shadow-sm">
            <h1 className="text-white">123</h1>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
