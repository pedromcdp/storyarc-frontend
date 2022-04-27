import SidebarSearch from '../Sidebar/SidebarSearch';

export default function HeaderCenter() {
  return (
    <div
      id="navbarCenter"
      className="hidden justify-center sm:inline-flex sm:basis-2/4"
    >
      <SidebarSearch />
    </div>
  );
}
