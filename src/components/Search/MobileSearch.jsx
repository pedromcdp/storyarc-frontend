import { useDispatch } from 'react-redux';
import { useClickOutside } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { hideSearch } from '../../features/search/searchSlice';

import SidebarSearch from '../Sidebar/SidebarSearch';

export default function MobileSearch() {
  const dispatch = useDispatch();
  const ref = useClickOutside(
    () => dispatch(hideSearch()),
    ['mouseup', 'touchend'],
  );

  return (
    <section
      className="absolute inset-0 z-30 bg-black/30 sm:hidden "
      aria-hidden="true"
    >
      <motion.div
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex relative justify-center py-3 px-4 w-full bg-white "
        onBlur={() => dispatch(hideSearch())}
        ref={ref}
      >
        <SidebarSearch focus />
      </motion.div>
    </section>
  );
}
