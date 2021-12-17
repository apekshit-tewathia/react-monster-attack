const Button = (props) => {
  return (
    <button className={`${props.className} m-1`} onClick={props.clicked}>
      {" "}
      {props.text}{" "}
    </button>
  );
};

export default Button;
