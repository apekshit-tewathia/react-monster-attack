const History = (props) => {
  return (
    <ul>
      {props.moves.map((move, index) => {
        return <li key={index}>{move.message}</li>;
      })}
    </ul>
  );
};

export default History;
