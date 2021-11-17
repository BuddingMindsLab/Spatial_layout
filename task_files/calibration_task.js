/********************************************************************************************************************************************/
// Calibration task

var calibration_instructions = {
  type: "instructions",
  pages: [
    `Before beginning, Please have your volume on for this experiment as instructions will be read aloud.`,
    `Before we start, please practice using your mouse by clicking on the black circles as they show up on your screen. <br>
Try to click as fast as you can when a circle appears. <br> But be careful! Try not to click outside the circles!
`,
  ],
  show_clickable_nav: true,
  allow_backward: false,
};

positions = [
  14, 53, 90, 10, 14, 26, 33, 44, 58, 5, 13, 95, 17, 50, 64, 83, 46, 5, 77, 33,
];

var calibration_trial = {
  on_start: function (trial) {
    trial.button_html =
      `<button style="background-color: #000000; 
      position: absolute;
      top:` +
      positions[position_index - 1] +
      `%;
      left: ` +
      positions[position_index] +
      `%;
      border: none;
      color: white;
      padding: 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 50%;"></button>`;
  },
  type: "html-button-response",
  data: { phase: "calibration" },
  stimulus: "<p></p>",
  choices: [""],
  trial_duration: 300000,
  on_finish(data){
    if (data.rt == null){	
    add_unattended_trials(1)}
  }
};

var position_index = 1;

calibration_timeline = {
  timeline: [calibration_trial],
  loop_function: function () {
    position_index += 2;
    if (position_index < positions.length - 1) {
      return true;
    } else {
      return false;
    }
  },
};

calibration_task_timeline = {
  timeline: [calibration_instructions, calibration_timeline],
};
