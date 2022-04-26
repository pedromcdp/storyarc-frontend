import {
  ClockIcon,
  TrendingUpIcon,
  CalendarIcon,
  HashtagIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import SidebarLogo from './SidebarLogo';
import SidebarSearchBar from './SidebarSearchBar';
import SidebarRow from './SidebarRow';
import RowsContainer from './RowsContainer';

function Sidebar() {
  return (
    <div className="hidden flex-col justify-between py-3 px-4 max-w-[600px] h-screen bg-white shadow-sm md:inline-flex xl:min-w-[300px]">
      <div className="flex flex-col flex-none">
        <SidebarLogo />
        <SidebarSearchBar />
      </div>
      <div className="flex flex-col grow">
        <RowsContainer title="Feed" ariaText="Opções de filtragem do feed">
          <SidebarRow Icon={HashtagIcon} title="Recentes" />
          <SidebarRow Icon={TrendingUpIcon} title="Em Alta" />
          <SidebarRow Icon={CalendarIcon} title="Por Ano" />
          <SidebarRow Icon={ClockIcon} title="Por Década" />
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
        <SidebarRow Icon={UserCircleIcon} title="Iniciar Sessão/Criar Conta" />
      </div>
    </div>
  );
}

export default Sidebar;
