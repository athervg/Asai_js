const Sample = ({ path, name }) => {
    return (
      <div className="p-2 border rounded shadow">
        <p className="font-semibold">{name}</p>
        <audio controls src={`file://${path}`} className="w-full" />
      </div>
    );
  };
  
  export default Sample;
  