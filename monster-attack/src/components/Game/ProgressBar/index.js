const ProgressBar = (props) => {
  return (
    <div class="progress">
      <div
        class="progress-bar progress-bar-striped"
        role="progressbar"
        style={{ width: `${props.value}%` }}
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  );
};

export default ProgressBar;
