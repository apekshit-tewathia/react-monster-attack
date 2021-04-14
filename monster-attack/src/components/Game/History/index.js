const History = (props) => {
  return (
    <ul>
      {props.moves.map((move, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              props.clicked(move);
            }}
          >
            {move.message}
          </li>
        );
      })}
    </ul>
  );
};

export default History;
