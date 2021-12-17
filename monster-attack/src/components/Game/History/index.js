import "components/Game/History/index.scss";
const History = (props) => {
  return (
    <ul class="border border-primary list-group history-list">
      <li className="font-weight-bold">HISTORY</li>
      {props.moves.map((move, index) => {
        return (
          <li
            className="list-group-item history-tile"
            key={index}
            onClick={() => {
              props.clicked(move, index);
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
