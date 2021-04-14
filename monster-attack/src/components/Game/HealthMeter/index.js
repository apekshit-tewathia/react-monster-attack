import ProgressBar from "components/Game/ProgressBar";
const HealthMeter = (props) => {
  return (
    <>
      <div class="font-weight-bold"> {props.name} </div>
      <ProgressBar value={props.health} />
      <div> {props.health} </div>
    </>
  );
};

export default HealthMeter;
