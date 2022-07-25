import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  BellIcon,
  LinkIcon,
} from '@heroicons/react/solid';
import PropTypes from 'prop-types';

export default function NotificationIcon({ type }) {
  switch (type) {
    case 'success':
      return <CheckCircleIcon className="text-verde notificationIcon" />;
    case 'error':
      return <XCircleIcon className="text-red-500 notificationIcon" />;
    case 'warning':
      return (
        <ExclamationCircleIcon className="text-yellow-500 notificationIcon" />
      );
    case 'info':
      return (
        <InformationCircleIcon className="text-blue-500 notificationIcon" />
      );
    case 'link':
      return <LinkIcon className="w-7 h-7 text-blue-500" />;
    default:
      return <BellIcon className="text-verde notificationIcon" />;
  }
}

NotificationIcon.propTypes = {
  type: PropTypes.string,
};
