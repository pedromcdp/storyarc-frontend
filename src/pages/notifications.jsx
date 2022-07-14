import NotificationPageContainer from '../components/Notification/NotificationPageContainer';
import MainLayout from '../layouts/MainLayout';

export default function notifications() {
  return (
    <MainLayout title="Notifications">
      <NotificationPageContainer>
        <h1 className="pb-2 text-xl border-b">Notificações</h1>
        {/* NotificationPageItem */}
      </NotificationPageContainer>
    </MainLayout>
  );
}
