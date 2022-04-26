import FeedFilter from '../FeedFilter';
import PostsContainer from './PostsContainer';

export default function Feed() {
  return (
    <div className="overflow-y-auto grow 2xl:flex 2xl:flex-row 2xl:justify-center 2xl:mx-auto 2xl:space-x-4 2xl:w-full">
      <div className="grow mx-auto max-w-md h-screen md:max-w-lg lg:max-w-2xl 2xl:mx-0">
        <FeedFilter />
        <PostsContainer />
      </div>
      <div className="hidden top-5 grow mt-5 max-w-xs 2xl:block 2xl:sticky">
        <div className="2xl:max-w-xs">
          <div className="p-5 bg-verde rounded-xl shadow-sm">
            <h1 className="text-white">123</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

//  <div className="grow 2xl:flex 2xl:flex-row 2xl:justify-center 2xl:mx-auto 2xl:space-x-4 2xl:w-full 2xl:mr-18">
//           <div className="overflow-y-auto grow pb-16 mx-auto max-w-md h-screen md:max-w-lg lg:max-w-2xl 2xl:mx-0">
//             <div className="mt-5 bg-white">
//               <h1>doisjdiosa</h1>
//             </div>
//             <div className="mt-5 bg-white">
//               <h1>doisjdiosa</h1>
//             </div>
//           </div>
//           <div className="hidden grow max-w-xs 2xl:block">
//             <div className="2xl:max-w-xs">
//               <div className="bg-black">
//                 <h1 className="text-white">123</h1>
//               </div>
//             </div>
//           </div>
//         </div>

//     <div className="overflow-y-auto grow pb-16 h-screen xl:mr-40">
//   <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
//     <FeedFilter />
//     <PostsContainer />
//   </div>
// </div>
