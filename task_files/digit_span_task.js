// ===========================================================================================================================================
// Delay task - digit span backwards

// first two numbers in number_set are practice
number_set = [
  "21", // practice 
  "75", // practice
  "14",
  "62",
  "185",
  "814",
  "9518",
  "374x",
  "48913",
  "19485",
  "9648x1",
  "529483",
  "6394x18",
  "2536x149",
  "165983648",
];

// instruction page
var instructions_delay_task = {
  type: "instructions-image-and-sound",
  pages: [
    "instructions/Screenshot (203).png",
    "instructions/Screenshot (204).png",
    "instructions/Screenshot (205).png",
  ],
  audio: [
    "recordings/SLP Instruction Recordings/SLP_12.mp3",
    "recordings/SLP Instruction Recordings/SLP_13.mp3",
    "recordings/SLP Instruction Recordings/SLP_14.mp3",
  ],
  show_clickable_nav: true,
};

var pre_delay_task = {
  type: "instructions-image-and-sound",
  pages: ["instructions/Screenshot (206).png"],
  audio: ["recordings/SLP Instruction Recordings/SLP_15.mp3"],
  show_clickable_nav: true,
};

var post_delay_task = {
  type: "instructions-image-and-sound",
  pages: ["instructions/Screenshot (207).png"],
  audio: ["recordings/SLP Instruction Recordings/SLP_16.mp3"],
  show_clickable_nav: true,
};

var digit_index = 0;

var test_stimuli = {
  type: "html-keyboard-response",
  stimulus: function () {
    var number = number_set[number_set_index];
    var digit = number[digit_index];
    if (digit == "x") {
      digit = "10";
    }
    var stimuli = '<div style="font-size:70px;">' + digit + "</div>";
    return stimuli;
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};

var display_digits = {
  timeline: [test_stimuli],
  repetitions: 1,
  loop_function: function (data) {
    while (digit_index + 1 != number_set[number_set_index].length) {
      digit_index += 1;
      return true;
    }
    digit_index = 0;
    return false;
  },
};

function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}

var scores = [0, 0];

var recall = {
  type: "digit-span-recall",
  correct_order: function () {
    return reverseString(number_set[number_set_index]);
  },
  trial_duration: null,
  sound: "stimuli/button_click_sound.mp4",
  on_finish: function (data) {
    var stimuli = reverseString(number_set[number_set_index]);
    var score = 0;
    for (i = 0; i < number_set[number_set_index].length; i++) {
      if (typeof data.recall[i] === "undefined") {
        break;
        // does not exist
      } else {
        // does exist
        if (data.recall[i] == stimuli[i]) {
          score += 1;
        }
      }
    }
    data.score = score;
    scores.push(score);
  },
};

var feedback = {
  type: "html-keyboard-response",
  stimulus: function () {
    var text = "";
    var accuracy = jsPsych.data.get().last(1).values()[0].accuracy;
    if (accuracy == 1) {
      text +=
        '<div style="font-size:35px; color:rgb(0 220 0)"><b>Correct</div>';
    } else {
      text +=
        '<div style="font-size:35px; color:rgb(240 0 0)"><b>Incorrect</div>';
    }
    //text += '<div style="font-size:30px; color:rgb(0 0 0)"><br><br>New trial starting now.</div>'
    return text;
  },
  choices: jsPsych.NO_KEYS,
  trial_duration: 1000,
};

var number_set_index = 0;

var practice_timeline = {
  timeline: [display_digits, recall, feedback],
  repetitions: 1,
  data: { phase: "practice delay" },
  loop_function: function (data) {
    number_set_index += 1;
    while (number_set_index != 2) {
      return true;
    }
    return false;
  },
};

var delay_task_timeline = {
  timeline: [display_digits, recall, feedback],
  repetitions: 1,
  data: { phase: "delay task" },
  loop_function: function (data) {
    while (
      number_set_index + 1 != number_set.length &&
      (number_set_index < 7 ||
        scores[scores.length - 1] > 3 ||
        scores[scores.length - 2] > 3)
    ) {
      number_set_index += 1;
      return true;
    }
    return false;
  },
};

digit_span_backwards_timeline = {
  timeline: [
    instructions_delay_task,
    practice_timeline,
    pre_delay_task,
    delay_task_timeline,
    post_delay_task
  ],
};