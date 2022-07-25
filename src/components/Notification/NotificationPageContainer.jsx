import { AnimateSharedLayout } from 'framer-motion';

export default function NotificationPageContainer({ children }) {
  return (
    <AnimateSharedLayout>
      <div className="flex flex-col py-4 px-5 mt-5 space-y-2 bg-white rounded-2xl border shadow-sm">
        {children}
      </div>
    </AnimateSharedLayout>
  );
}
