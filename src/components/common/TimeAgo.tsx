import { formatTimeAgo } from '../../lib/format';

interface Props {
  ts: string;
}

export default function TimeAgo({ ts }: Props) {
  return (
    <time
      dateTime={ts}
      style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}
      title={new Date(ts).toLocaleString()}
    >
      {formatTimeAgo(ts)}
    </time>
  );
}
