import SignUpForm from './SignUpForm';

export default function SignUp() {
  return (
    <div className="flex flex-col grow justify-center items-center py-8 min-w-full  max-w-full min-h-[25rem] bg-white shadow-sm transition-all ease-in-out lg:grow-0 lg:w-max lg:min-w-[30rem] duration-50">
      <SignUpForm />
    </div>
  );
}
