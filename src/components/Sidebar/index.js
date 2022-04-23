import {
  ClockIcon,
  TrendingUpIcon,
  CalendarIcon,
  HashtagIcon,
  UserCircleIcon,
} from '@heroicons/react/outline';
import SidebarLogo from './SidebarLogo';
import SideBarSearchBar from './SideBarSearchBar';
import FeedOptionRow from './FeedOptionRow';
import RowsContainer from './RowsContainer';

function Sidebar() {
  return (
    <div className="max-w-[600px] xl:min-w-[300px] bg-white h-screen px-4 py-3 shadow-sm flex flex-col justify-between">
      <div className="flex flex-col flex-none">
        <SidebarLogo />
        <SideBarSearchBar />
      </div>
      <div className="flex flex-col flex-grow overflow-y-scroll">
        <RowsContainer title="Feed" ariaText="Opções de filtragem do feed">
          <FeedOptionRow Icon={HashtagIcon} title="Recentes" />
          <FeedOptionRow Icon={TrendingUpIcon} title="Em Alta" />
          <FeedOptionRow Icon={CalendarIcon} title="Por Ano" />
          <FeedOptionRow Icon={ClockIcon} title="Por Década" />
        </RowsContainer>
        <RowsContainer
          title="Principais localizações"
          ariaText="Principais localizações"
        >
          <FeedOptionRow Icon={HashtagIcon} title="Recentes" />
          <FeedOptionRow Icon={TrendingUpIcon} title="Em Alta" />
          <FeedOptionRow Icon={CalendarIcon} title="Por Ano" />
          <FeedOptionRow Icon={ClockIcon} title="Por Década" />
        </RowsContainer>
      </div>
      <div className="flex flex-none">
        <FeedOptionRow
          Icon={UserCircleIcon}
          title="Iniciar Sessão/Criar Conta"
        />
      </div>
    </div>
  );
}

export default Sidebar;
