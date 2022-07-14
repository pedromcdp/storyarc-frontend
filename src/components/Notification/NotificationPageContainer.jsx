import { AnimateSharedLayout } from 'framer-motion';

export default function NotificationPageContainer({ children }) {
  return (
    <AnimateSharedLayout>
      <div className="flex flex-col p-5 mt-5 bg-white rounded-2xl border shadow-sm">
        {children}
      </div>
    </AnimateSharedLayout>
  );
}
