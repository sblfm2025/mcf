export default function SegmentButton({ active, children, onClick }) {
  return (
    <button type="button" className={`segment-button ${active ? "is-active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
