import SidebarLogo from '../Sidebar/SidebarLogo';

export default function CookieBox() {
  return (
    <div className="flex fixed right-5 bottom-5 flex-col py-4 px-6 max-w-sm bg-white rounded-2xl border shadow-xl items">
      <SidebarLogo />
      <p className="text-sm">
        O storyarc usa{' '}
        <span className="text-xl font-medium text-verde">cookies</span> para te
        oferecer as informações mais relevantes. Por favor, aceita as{' '}
        <span className="text-xl font-medium text-verde">cookies</span> para a
        performace ideal!
      </p>
      <div className="flex gap-3 mt-5">
        <button className="py-3 px-4 text-white hover:text-verde bg-verde hover:bg-white rounded-lg border border-verde transition ease-in-out durantion-100">
          Aceitar cookies
        </button>
        <button className="underline decoration-verde underline-offset-[0.3rem]">
          Mais informações
        </button>
      </div>
    </div>
  );
}
