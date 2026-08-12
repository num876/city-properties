export default function Skeleton({ height = '200px', width = '100%', borderRadius = '10px' }: { height?: string; width?: string; borderRadius?: string }) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius }}
      aria-hidden="true"
    />
  );
}
