import {Spinner} from '@/app/components/reactstrap';

export default function Loading() {
  return (
    <div className="loading">
      <Spinner />
    </div>
  );
}