import SidebarLogo from '../Sidebar/SidebarLogo';
import LoginForm from './LoginForm';

export default function Login() {
  return (
    <div className="flex flex-col grow justify-center items-center min-w-full max-w-full h-screen min-h-[25rem] bg-white shadow-sm transition-all ease-in-out lg:grow-0 lg:w-max lg:min-w-[30rem] duration-50">
      <div className="mb-12">
        <SidebarLogo />
      </div>
      <LoginForm />
    </div>
  );
}
