import { feedFilters } from '../../utils/feedFilters';
import RowsContainer from '../Sidebar/RowsContainer';
import SidebarRow from '../Sidebar/SidebarRow';

export default function index() {
  return (
    <div className="p-2 px-5 mt-5 bg-white rounded-2xl shadow-sm md:hidden">
      <RowsContainer
        title="Filtrar feed por"
        ariaText="Opções de filtragem do feed"
      >
        {feedFilters.map((filter) => (
          <SidebarRow
            key={filter.title}
            title={filter.name}
            Icon={filter.icon}
            filter={filter}
          />
        ))}
      </RowsContainer>
    </div>
  );
}
