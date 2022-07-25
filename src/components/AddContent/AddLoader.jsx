import Loading from '../Loading';

export default function AddLoader() {
  return (
    <div className="absolute top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2">
      <Loading />
    </div>
  );
}
