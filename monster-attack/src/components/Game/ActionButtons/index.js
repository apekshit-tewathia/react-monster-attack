import Button from "components/Button";

const ActionButtons = (props) => {
  return (
    <>
      <Button text="Attack" clicked={props.attackHandler} />
      <Button text="Special Attack" clicked={props.specialAttackHandler} />
      <Button text="Heal" clicked={props.healHandler} />
      <Button text="Give Up" clicked={props.giveUpHandler} />
    </>
  );
};

export default ActionButtons;
