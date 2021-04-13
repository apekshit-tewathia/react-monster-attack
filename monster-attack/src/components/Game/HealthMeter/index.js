const HealthMeter = (props) => {
  return (
    <>
      <div> {props.name} </div>
      <div> {props.health} </div>
    </>
  );
};

export default HealthMeter;
