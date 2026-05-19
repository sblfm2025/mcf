export default function TestPattern({ label = "MAIN 6:4" }) {
  return (
    <main className="overlay-screen test-pattern">
      <div className="test-bars">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="test-center">
        <strong>{label}</strong>
        <p>MCF OVERLAY TEST PATTERN</p>
      </div>
      <div className="test-safe" />
    </main>
  );
}
