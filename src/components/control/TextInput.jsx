export default function TextInput({ label, value, onChange, multiline = false }) {
  const Input = multiline ? "textarea" : "input";
  return (
    <label className="field">
      <span>{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} rows={multiline ? 3 : undefined} />
    </label>
  );
}
