import HeaderLeft from './HeaderLeft';
import HeaderCenter from './HeaderCenter';
import HeaderRight from './HeaderRight';

export default function Header() {
  return (
    <header className="flex sticky top-0 z-40 justify-between items-center py-1 px-4 bg-white shadow-sm md:hidden">
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </header>
  );
}
