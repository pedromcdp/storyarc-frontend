// import { UserCircleIcon } from '@heroicons/react/outline';
import { PlusCircleIcon } from '@heroicons/react/solid';
import SidebarLogo from './SidebarLogo';
// import SidebarSearch from './SidebarSearch';
import SidebarRow from './SidebarRow';
import RowsContainer from './RowsContainer';
import { feedFilters } from '../../utils/feedFilters';
// import SidebarAuthRow from './SidebarAuthRow';
import useAuth from '../../hooks/auth';
// import NotificationButton from './NotificationButton';

function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="hidden h-screen max-w-[600px] flex-col justify-between bg-white px-4 py-2 shadow-sm md:inline-flex xl:min-w-[300px]">
      <div className="flex flex-none flex-col">
        <div className="flex items-center justify-between">
          <SidebarLogo />
          {/* {user && <NotificationButton />} */}
        </div>
        {/* <SidebarSearch /> */}
      </div>
      <div className="flex grow flex-col">
        <RowsContainer
          title="Nova publicação"
          ariaText="Adicionar conteúdo ao storyarc"
          moreClasses="xl:hidden"
        >
          <SidebarRow
            title="Criar uma publicação"
            Icon={PlusCircleIcon}
            addBtn
          />
        </RowsContainer>
        <RowsContainer title="Feed" ariaText="Opções de filtragem do feed">
          {feedFilters.map((filter) => (
            <SidebarRow
              key={`${filter.name}-sidebar`}
              title={filter.name}
              Icon={filter.icon}
              filter={filter}
            />
          ))}
        </RowsContainer>
        <RowsContainer
          title="Principais localizações"
          ariaText="Principais localizações"
        >
          <SidebarRow
            src="https://api-assets.ua.pt/files/imgs/000/000/048/original.jpg"
            title="Universidade de Aveiro"
          />
          <SidebarRow
            src="https://media-cdn.tripadvisor.com/media/photo-s/0e/e4/16/a9/sur-les-quais-d-aveiro.jpg"
            title="Rossio"
          />
          <SidebarRow
            src="https://www.evasoes.pt/files/2019/02/33489092_GL10012019_MARIAJOAOGALA001_WEB-1-960x640_c.jpg"
            title="Farol da Barra"
          />
        </RowsContainer>
      </div>
      {/* <div className="flex flex-none">
        {user ? (
          <SidebarAuthRow Icon={UserCircleIcon} user={user} />
        ) : (
          <SidebarRow
            Icon={UserCircleIcon}
            title="Iniciar sessão/Criar conta"
            loginBtn
            href="/auth/signin"
          />
        )}
      </div> */}
    </aside>
  );
}

export default Sidebar;
