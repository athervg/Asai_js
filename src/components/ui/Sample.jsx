// Sample.jsx
const Sample = ({ path, name }) => {
  const asaiSrc = `asai://${encodeURIComponent(path)}`;

  return (
    <div className="p-2 border rounded shadow">
      <p className="font-semibold">{name}</p>
      <audio controls autoPlay src={asaiSrc} className="w-full" />
    </div>
  );
};

export default Sample;
