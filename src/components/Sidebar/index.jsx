import { UserCircleIcon } from '@heroicons/react/outline';
import { PlusCircleIcon } from '@heroicons/react/solid';
import SidebarLogo from './SidebarLogo';
import SidebarSearch from './SidebarSearch';
import SidebarRow from './SidebarRow';
import RowsContainer from './RowsContainer';
import { feedFilters } from '../../utils/feedFilters';
import SidebarAuthRow from './SidebarAuthRow';
import useAuth from '../../hooks/auth';
import NotificationButton from './NotificationButton';

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="hidden flex-col justify-between py-3 px-4 max-w-[600px] h-screen bg-white rounded-r-3xl border-r shadow-sm md:inline-flex xl:min-w-[300px]">
      <div className="flex flex-col flex-none">
        <div className="flex justify-between items-center">
          <SidebarLogo />
          {user && <NotificationButton />}
        </div>
        <SidebarSearch />
      </div>
      <div className="flex flex-col grow">
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
      <div className="flex flex-none">
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
      </div>
    </div>
  );
}

export default Sidebar;
