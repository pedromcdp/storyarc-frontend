import {
  HashtagIcon,
  TrendingUpIcon,
  CalendarIcon,
  ClockIcon,
} from '@heroicons/react/outline';
import RowsContainer from '../Sidebar/RowsContainer';
import SidebarRow from '../Sidebar/SidebarRow';

export default function index() {
  return (
    <div className="p-2 px-5 mt-5 bg-white rounded-2xl shadow-sm md:hidden">
      <RowsContainer
        title="Filtrar feed por"
        ariaText="Opções de filtragem do feed"
      >
        <SidebarRow Icon={HashtagIcon} title="Recentes" />
        <SidebarRow Icon={TrendingUpIcon} title="Em Alta" />
        <SidebarRow Icon={CalendarIcon} title="Por Ano" />
        <SidebarRow Icon={ClockIcon} title="Por Década" />
      </RowsContainer>
    </div>
  );
}
