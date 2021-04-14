const Button = (props) => {
  return (
    <button className="btn btn-primary m-1" onClick={props.clicked}>
      {" "}
      {props.text}{" "}
    </button>
  );
};

export default Button;
