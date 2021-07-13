// ===========================================================================================================================================
// Delay task - n-back task

_1practice = ["13357705", "57377466"];

_2practice = ["46452327", "30121676"];

_1back = [
  "057714622355104447600", //1 double
  "665247776221447375411", //1 double
  "472247705200322163330", //1 double
  "334476112476334310003", //1 double
  "623334566012113550032", //1 double
  "223466374334611573000",
]; //1 double

_2back = [
  "0",
  "3212535760501237372565", //1 overlapping
  "0137171622325434535171", //1 overlapping
  "0525162020063672711454", //1 overlapping
  "3047675150363242457101", //1 overlapping
  "3575223630521217363141",
]; //1 overlapping

_3back = [
  "0",
  "0",
  "26076100125315347046156", //1 overlapping
  "02706723063147123425015", //1 overlapping
  "52456326123453176130560", //1 overlapping
  "61362530541043074276026",
]; //1 overlapping

_4back = [
  "0",
  "0",
  "0",
  "140123066507751203320731", //3 overlapping 1 double
  "150762473543154105244321", //3 overlapping 1 double
  "421340761176232163250367",
]; //3 overlapping 1 double

_5back = [
  "0",
  "0",
  "0",
  "0",
  "5302154017744263510627136", //3 overlapping 1 double
  "2764027031261301654271510",
]; //3 overlapping 1 double

_6back = ["0", "0", "0", "0", "0", "01021271624375010377606301"]; //3 overlapping

levels = [
  [_1practice, _2practice],
  [_1back, _2back, _3back, _4back, _5back, _6back],
];

var delay_task_images = [
  "shapes for delay task/0.png",
  "shapes for delay task/1.png",
  "shapes for delay task/2.png",
  "shapes for delay task/3.png",
  "shapes for delay task/4.png",
  "shapes for delay task/5.png",
  "shapes for delay task/6.png",
  "shapes for delay task/7.png",
];

var instructions_delay_images = [
  "instructions/Screenshot (228).png",
  "instructions/Screenshot (229).png",
  "instructions/Screenshot (230).png",
  "instructions/Screenshot (231).png",
  "instructions/Screenshot (232).png",
  "instructions/Screenshot (233).png",
  "instructions/Screenshot (234).png",
  "instructions/Screenshot (235).png",
  "instructions/Screenshot (236).png",
];

var n = 1;
var block = 0;
var trial_index = 0;
var main_task = 0;
var count_correct = 0;
var move_level = false;
var initial_response = null;
var response = null;
var delay_start_time = null;
var delay_end_time = null;

var instructions_delay_task = {
  on_start: function () {
    delay_start_time = new Date();
  },
  type: "instructions-image-and-sound",
  pages: [
    "instructions/Screenshot (227).png",
    "instructions/Screenshot (228).png",
    "instructions/Screenshot (229).png",
    "instructions/Screenshot (230).png",
    "instructions/Screenshot (231).png",
    "instructions/Screenshot (232).png",
  ],
  audio: [
    "recordings/SLP Instruction Recordings/delay_task/ST_11.mp3",
    "recordings/SLP Instruction Recordings/delay_task/ST_12.mp3",
    "recordings/SLP Instruction Recordings/delay_task/ST_13.mp3",
    "recordings/SLP Instruction Recordings/delay_task/ST_14.mp3",
    "recordings/SLP Instruction Recordings/delay_task/ST_15.mp3",
    "recordings/SLP Instruction Recordings/delay_task/ST_16.mp3",
  ],
  show_clickable_nav: true,
  allow_keys: false,
};

pre_delay_task = {
  type: "instructions-image-and-sound",
  pages: ["instructions/Screenshot (235).png"],
  audio: ["recordings/SLP Instruction Recordings/delay_task/ST_19.mp3"],
  show_clickable_nav: true,
  allow_keys: false,
};

post_delay_task = {
  on_finish: function () {
    delay_end_time = new Date();
  },
  type: "instructions-image-and-sound",
  pages: ["instructions/Screenshot (236).png"],
  audio: ["recordings/SLP Instruction Recordings/delay_task/ST_20.mp3"],
  show_clickable_nav: true,
  allow_keys: false,
};

var n_back_trial = {
  on_start: function (trial) {
    trial.stimulus =
      '<img src="shapes for delay task\\' +
      levels[main_task][n - 1][block][trial_index] +
      '.png" style="max-width:50vw; max-height: 50vh;"></img>';
    trial.data = {
      block: block,
      phase: "delay task",
      "main delay task": main_task,
    };
  },
  type: "html-keyboard-response",
  choices: [37, 39],
  stimulus: "<p> initial</p>",
  prompt: `<div> <p style="position:absolute; top:46%; right: 3%; font-size: 3vw"> <b>DIFFERENT</b> </p>
       <img src ="shapes for delay task/triangle_right.png" style="position:absolute; top:50%; right: 20%; width:3%"> 
        <p style="position:absolute; top:46%; left: 10%; font-size: 3vw"> <b>SAME</b> </p>
       <img src ="shapes for delay task/triangle_left.png" style="position:absolute; top:50%; left: 20%; width:3%"> </div> 
    `,
  response_ends_trial: false,
  trial_duration: 500,
  on_finish: function (data) {
    initial_response = data.key_press;
  },
};

var ISI = {
  on_start: function (trial) {
    trial.data = {
      block: block,
      phase: "delay task",
      "main delay task": main_task,
    };
  },
  type: "html-keyboard-response",
  choices: [37, 39],
  stimulus: '<div style="font-size:12vw;">+</div>',
  trial_duration: 2500,
  prompt: `<div> <p style="position:absolute; top:46%; right: 3%; font-size: 3vw"> <b>DIFFERENT</b> </p>
       <img src ="shapes for delay task/triangle_right.png" style="position:absolute; top:50%; right: 20%; width:3%"> 
        <p style="position:absolute; top:46%; left: 10%; font-size: 3vw"> <b>SAME</b> </p>
       <img src ="shapes for delay task/triangle_left.png" style="position:absolute; top:50%; left: 20%; width:3%"> </div> 
    `,
  data: { block: block - 1 },
  response_ends_trial: false,
  on_finish: function (data) {
    data.correct = check_correctness(data.key_press);
  },
};

function check_correctness(ISI_response) {
  if (initial_response != null) {
    if (initial_response == 37) {
      response = 1;
    } else if (initial_response == 39) {
      response = 0;
    }
  } else if (ISI_response != null) {
    if (ISI_response == 37) {
      response = 1;
    } else if (ISI_response == 39) {
      response = 0;
    }
  } else {
    response = null;
  }
  if (response == 1) {
    if (trial_index - n < 0) {
      return false;
    } else if (
      levels[main_task][n - 1][block][trial_index] ==
      levels[main_task][n - 1][block][trial_index - n]
    ) {
      return true;
    } else {
      return false;
    }
  } else if (response == 0) {
    if (trial_index - n < 0) {
      return true;
    } else if (
      levels[main_task][n - 1][block][trial_index] ==
      levels[main_task][n - 1][block][trial_index - n]
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

var feedback_trial = {
  on_start: function (trial) {
    result = jsPsych.data.getLastTrialData().select("correct").values[0];
    if (result == true && response == 1) {
      //it was same
      trial.stimulus = `<div><img src="shapes for delay task/green_checkmark.png" style = "width:20%"></img>
        <img src="shapes for delay task/green_rectangle.png" style = "position:absolute; width:25%; height:15% ;top: 45%; left: 4%"> </div>`;
    } else if (result == true && response == 0) {
      //it was different
      trial.stimulus = `<div><img src="shapes for delay task/green_checkmark.png" style = "width:23%"></img>
        <img src="shapes for delay task/green_rectangle.png" style = "width:25%; height:15% ; position:absolute; top: 45%; right: 0.5%"></div>`;
    } else if (result == false && response == 1) {
      //it was different
      trial.stimulus = `<div><img src="shapes for delay task/red_ex.png" style = "width:17%"></img>
        <img src="shapes for delay task/green_rectangle.png" style = "width:25%; height:15% ; position:absolute; top: 45%; right: 0.5%"></div>`;
    } else if (result == false && response == 0) {
      // it was same
      trial.stimulus = `<div><img src="shapes for delay task/red_ex.png" style = "width:17%"></img>
        <img src="shapes for delay task/green_rectangle.png" style = "position:absolute; width:25%; height:15% ;top: 45%; left: 4%"> </div>`;
    } else if (
      response == null &&
      levels[main_task][n - 1][block][trial_index] ==
        levels[main_task][n - 1][block][trial_index - n]
    ) {
      //same
      trial.stimulus = `<img src = "shapes for delay task/hourglass.png" style="max-width: 40vw; max-height: 45vh;"> </img>
        <img src="shapes for delay task/green_rectangle.png" style = "position:absolute; width:25%; height:15% ;top: 45%; left: 4%"> </div>`;
    } else if (
      response == null &&
      levels[main_task][n - 1][block][trial_index] !=
        levels[main_task][n - 1][block][trial_index - n]
    ) {
      // different
      trial.stimulus = `<img src = "shapes for delay task/hourglass.png" style="max-width: 40vw; max-height: 45vh;"> </img>
        <img src="shapes for delay task/green_rectangle.png" style = "width:25%; height:15% ; position:absolute; top: 45%; right: 0.5%"></div>`;
    }
  },
  type: "html-keyboard-response",
  stimulus: "<p> Initial</p>",
  prompt: `<div> <p style="position:absolute; top:46%; right: 3%; font-size: 3vw"> <b>DIFFERENT</b> </p>
       <img src ="shapes for delay task/triangle_right.png" style="position:absolute; top:50%; right: 20%; width:3%"> 
        <p style="position:absolute; top:46%; left: 10%; font-size: 3vw"> <b>SAME</b> </p>
       <img src ="shapes for delay task/triangle_left.png" style="position:absolute; top:50%; left: 20%; width:3%"> </div> 
    `,
  trial_duration: 1500,
  response_ends_trial: false,
};

var inter_n_message = {
  on_start: function (trial) {
    trial.pages = [
      "In this round, you will be in <b> level " +
        n +
        "</b>. <br> This means you will have to check if the shape you currently see is similar to the one you saw " +
        n +
        " items before.",
    ];
  },
  type: "instructions",
  show_clickable_nav: true,
  allow_keys: false,
};

var display_n_back__practice_trial = {
  timeline: [n_back_trial, ISI, feedback_trial],
  repetitions: 1,
  loop_function: function (data) {
    while (trial_index + 1 < levels[main_task][n - 1][block].length) {
      trial_index += 1;
      return true;
    }
    trial_index = 0;
    var last_block_mistakes = jsPsych.data
      .get()
      .last(3 * levels[main_task][n - 1][block].length)
      .filter({ correct: false })
      .count();

    count_correct = 8 - last_block_mistakes;
    if (move_level) {
      n += 1;
      block = 0;
    } else if (last_block_mistakes < 4) {
      move_level = true;
      n += 1;
      block = 0;
    } else if (last_block_mistakes >= 4) {
      block = 1;
    }
    if (n == 3) {
      main_task = 1;
      n = 1;
    }
    return false;
  },
};

var loop_n_practice_message = {
  on_start: function (trial) {
    trial.pages = [
      "In this round, you will continue at <b>level " + n + "</b>.",
    ];
  },
  type: "instructions",
  pages: [""],
  show_clickable_nav: true,
  allow_keys: false,
};

var correct_message = {
  on_start: function (trial) {
    trial.pages = [
      "Good job! <br> You got <b>" + count_correct + " out of 8</b> correct!",
    ];
  },
  type: "instructions",
  pages: [""],
  show_clickable_nav: true,
  allow_keys: false,
};

inter_n_message_if_node = {
  timeline: [correct_message, inter_n_message],
  conditional_function: function () {
    if (move_level) {
      return true;
    } else {
      return false;
    }
  },
};

var n_back_between_message_1 = {
  on_start: function (trial) {
    trial.prompts = [
      '<p style="position:absolute; top: 15%; right: 33%; font-size: 3vw; text-align: center;"> You got <b>' +
        count_correct +
        " out of 8</b> correct! </p>",
    ];
  },
  type: "instructions-image-and-sound",
  pages: ["instructions/Screenshot (233).png"],
  audio: ["recordings/SLP Instruction Recordings/delay_task/ST_17.mp3"],
  show_clickable_nav: true,
  allow_keys: false,
};

var n_back_between_message_2 = {
  on_start: function (trial) {
    trial.prompts = [
      '<p style="position:absolute; top: 15%; right: 33%; font-size: 3vw; text-align: center;"> You got <b>' +
        count_correct +
        " out of 8</b> correct! </p>",
    ];
  },
  type: "instructions-image-and-sound",
  pages: ["instructions/Screenshot (234).png"],
  audio: ["recordings/SLP Instruction Recordings/delay_task/ST_18.mp3"],
  prompts: [
    '<p style="position:absolute; font-size: 3vw; top: 15%; right: 33%; text-align: center;"> You got <b>' +
      count_correct +
      " out of 8</b> correct! </p>",
  ],
  show_clickable_nav: true,
  allow_keys: false,
};

practice_n_back_if_node_1 = {
  timeline: [
    n_back_between_message_1,
    loop_n_practice_message,
    display_n_back__practice_trial,
    correct_message,
    inter_n_message,
  ],
  conditional_function: function () {
    if (!move_level) {
      move_level = true;
      return true;
    } else {
      move_level = false;
      return false;
    }
  },
  loop_function: function () {
    move_level = false;

    return false;
  },
};

practice_n_back_if_node_2 = {
  timeline: [
    n_back_between_message_2,
    loop_n_practice_message,
    display_n_back__practice_trial,
    correct_message,
  ],
  conditional_function: function () {
    if (!move_level) {
      move_level = true;
      return true;
    } else {
      return false;
    }
  },
};

var display_n_back_trial = {
  timeline: [n_back_trial, ISI],
  repetitions: 1,
  loop_function: function (data) {
    while (trial_index + 1 < levels[main_task][n - 1][block].length) {
      trial_index += 1;
      return true;
    }
    var last_block_mistakes = jsPsych.data
      .get()
      .last(2 * levels[main_task][n - 1][block].length)
      .filter({ correct: false })
      .count();

    block += 1;
    trial_index = 0;
    if (last_block_mistakes >= 4 && n >= 2) {
      n = n - 1;
      move_level = true;
    } else if (last_block_mistakes <= 2) {
      n = n + 1;
      move_level = true;
    } else {
      move_level = false;
    }
    return false;
  },
};

var n_back_timeline = {
  timeline: [
    instructions_delay_task,
    display_n_back__practice_trial,
    inter_n_message_if_node,
    practice_n_back_if_node_1,
    display_n_back__practice_trial,
    practice_n_back_if_node_2,
    pre_delay_task,
    inter_n_message,
    display_n_back_trial,
    inter_n_message,
    display_n_back_trial,
    inter_n_message,
    display_n_back_trial,
    inter_n_message,
    display_n_back_trial,
    inter_n_message,
    display_n_back_trial,
    inter_n_message,
    display_n_back_trial,
    post_delay_task,
  ],
};
