export default function RunningText({ runningText }) {
  if (!runningText?.active) return null;

  return (
    <div className={`running-text speed-${runningText.speed || "normal"}`}>
      <div className="running-text-track">
        <span>{runningText.text}</span>
        <span>{runningText.text}</span>
      </div>
    </div>
  );
}
