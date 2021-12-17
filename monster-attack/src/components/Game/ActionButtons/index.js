import Button from "components/Button";

const ActionButtons = (props) => {
  return (
    <>
      <Button
        text="Attack"
        clicked={props.attackHandler}
        className="btn btn-primary"
      />
      <Button
        text="Special Attack"
        clicked={props.specialAttackHandler}
        className="btn btn-info"
      />
      <Button
        text="Heal"
        clicked={props.healHandler}
        className="btn btn-success"
      />
      <Button
        text="Give Up"
        clicked={props.giveUpHandler}
        className="btn btn-danger"
      />
    </>
  );
};

export default ActionButtons;
