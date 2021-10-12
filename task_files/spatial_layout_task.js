// ==========================================================================================================================================
// Main task - spatial layout card game experiment

/******************************************************************************************************************************************/
//files

E = [
  "stimuli/shoes.png",
  "stimuli/shirt.png",
  "stimuli/car.png",
  "stimuli/fish.png",
  "stimuli/pig.png",
  "stimuli/cat.png",
  "stimuli/horse.png",
  "stimuli/strawberry.png",
  "stimuli/milk.png",
  "stimuli/banana.png",
  "stimuli/plant.png",
  "stimuli/shovel.png",
  "stimuli/bell.png",
  "stimuli/toothbrush.png",
  "stimuli/pencil.png",
  "stimuli/baseball bat.png",
];

F = [
  "stimuli/sock.png",
  "stimuli/pants.png",
  "stimuli/bus.png",
  "stimuli/bird.png",
  "stimuli/chicken.png",
  "stimuli/dog.png",
  "stimuli/bunny.png",
  "stimuli/watermelon.png",
  "stimuli/egg.png",
  "stimuli/orange.png",
  "stimuli/tree.png",
  "stimuli/broom.png",
  "stimuli/clock.png",
  "stimuli/spoon.png",
  "stimuli/crayons.png",
  "stimuli/ball.png",
];

G = [
  "stimuli/shoes.png",
  "stimuli/pants.png",
  "stimuli/car.png",
  "stimuli/bird.png",
  "stimuli/chicken.png",
  "stimuli/dog.png",
  "stimuli/horse.png",
  "stimuli/watermelon.png",
  "stimuli/milk.png",
  "stimuli/banana.png",
  "stimuli/tree.png",
  "stimuli/shovel.png",
  "stimuli/bell.png",
  "stimuli/spoon.png",
  "stimuli/pencil.png",
  "stimuli/ball.png",
];

H = [
  "stimuli/sock.png",
  "stimuli/shirt.png",
  "stimuli/bus.png",
  "stimuli/fish.png",
  "stimuli/pig.png",
  "stimuli/cat.png",
  "stimuli/bunny.png",
  "stimuli/strawberry.png",
  "stimuli/egg.png",
  "stimuli/orange.png",
  "stimuli/plant.png",
  "stimuli/broom.png",
  "stimuli/clock.png",
  "stimuli/toothbrush.png",
  "stimuli/crayons.png",
  "stimuli/baseball bat.png",
];

image_set = [E, F, G, H];

practice_set = [
  "stimuli/practice stimuli/box.png",
  "stimuli/practice stimuli/brush.png",
  "stimuli/practice stimuli/crown.png",
  "stimuli/practice stimuli/cup.png",
  "stimuli/practice stimuli/dice.png",
  "stimuli/practice stimuli/duck.png",
];

var video1 = "stimuli/videos/start to blue.mp4";
var video2 = "stimuli/videos/blue to orange.mp4";

var instruction_images = [
  "instructions/Screenshot (195).png",
  "instructions/Screenshot (196).png",
  "instructions/Screenshot (197).png",
  "instructions/Screenshot (198).png",
  "instructions/Screenshot (199).png",
  "instructions/Screenshot (200).png",
  "instructions/Screenshot (201).png",
  "instructions/Screenshot (202).png",
  "instructions/Screenshot (203).png",
  "instructions/Screenshot (204).png",
  "instructions/Screenshot (205).png",
  "instructions/Screenshot (206).png",
  "instructions/Screenshot (207).png",
  "instructions/Screenshot (208).png",
  "instructions/Screenshot (209).png",
  "instructions/Screenshot (210).png",
  "instructions/Screenshot (211).png",
  "instructions/Screenshot (212).png",
  "instructions/Screenshot (213).png",
  "instructions/Screenshot (214).png",
  "instructions/Screenshot (215).png",
  "instructions/Screenshot (216).png",
];

var instructions_audio = [
  "recordings/SLP Instruction Recordings/SLP_2new.mp3",
  "recordings/SLP Instruction Recordings/SLP_3.mp3",
  "recordings/SLP Instruction Recordings/SLP_4.mp3",
  "recordings/SLP Instruction Recordings/SLP_5.mp3",
  "recordings/SLP Instruction Recordings/SLP_6.mp3",
  "recordings/SLP Instruction Recordings/SLP_7.mp3",
  "recordings/SLP Instruction Recordings/SLP_9+10.mp3",
  "recordings/SLP Instruction Recordings/SLP_12.mp3",
  "recordings/SLP Instruction Recordings/SLP_13.mp3",
  "recordings/SLP Instruction Recordings/SLP_14.mp3",
  "recordings/SLP Instruction Recordings/SLP_15.mp3",
  "recordings/SLP Instruction Recordings/SLP_16.mp3",
  "recordings/SLP Instruction Recordings/SLP_17.mp3",
  "recordings/SLP Instruction Recordings/SLP_18.mp3",
  "recordings/SLP Instruction Recordings/SLP_19.mp3",
  "recordings/SLP Instruction Recordings/SLP_21+23.mp3",
  "recordings/SLP Instruction Recordings/SLP_22+24.mp3",
  "recordings/SLP Instruction Recordings/SLP_26.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_11.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_12.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_13.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_14.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_15.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_16.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_17.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_18.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_19.mp3",
  "recordings/SLP Instruction Recordings/delay_task/ST_20.mp3",
];

/******************************************************************************************************************************************/
// create timeline variables based on counterbalancing group

function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function create_timeline_variables() {
  var group = jsPsych.data.getURLVariable("exp");
  var phase1_variables = [];
  var phase2_variables = [];
  var test_variables = [];
  if (group == "1") {
    var set1 = shuffle(E);
    var set2 = shuffle(F);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/blue world.png",
        overlapping: true,
        layout: "B",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: true,
        phase: "test",
      });
    }
  }
  if (group == "2") {
    var set1 = shuffle(F);
    var set2 = shuffle(E);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/yellow world.png",
        overlapping: true,
        layout: "Y",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: true,
        phase: "test",
      });
    }
  }
  if (group == "3") {
    var set1 = shuffle(G);
    var set2 = shuffle(H);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/blue world.png",
        overlapping: true,
        layout: "B",
        test: false,
        phase: "phase2",
      }),
        test_variables.push({
          correct_response: set1[i],
          image_set: set1,
          map: "stimuli/blue world.png",
          overlapping: false,
          layout: "B",
          test: true,
          phase: "test",
        });
    }
  }
  if (group == "4") {
    var set1 = shuffle(H);
    var set2 = shuffle(G);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/yellow world.png",
        overlapping: true,
        layout: "Y",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/blue world.png",
        overlapping: false,
        layout: "B",
        test: true,
        phase: "test",
      });
    }
  }
  if (group == "5") {
    var set1 = shuffle(F);
    var set2 = shuffle(E);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/blue world.png",
        overlapping: true,
        layout: "B",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: true,
        phase: "test",
      });
    }
  }
  if (group == "6") {
    var set1 = shuffle(E);
    var set2 = shuffle(F);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/yellow world.png",
        overlapping: true,
        layout: "Y",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: true,
        phase: "test",
      });
    }
  }
  if (group == "7") {
    var set1 = shuffle(H);
    var set2 = shuffle(G);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/blue world.png",
        overlapping: true,
        layout: "B",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: true,
        phase: "test",
      });
    }
  }
  if (group == "8") {
    var set1 = shuffle(G);
    var set2 = shuffle(H);
    for (var i = 0; i < set1.length; i++) {
      phase1_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: false,
        phase: "phase1",
      });
      phase2_variables.push({
        correct_response: set2[i],
        image_set: set2,
        map: "stimuli/yellow world.png",
        overlapping: true,
        layout: "Y",
        test: false,
        phase: "phase2",
      });
      test_variables.push({
        correct_response: set1[i],
        image_set: set1,
        map: "stimuli/yellow world.png",
        overlapping: false,
        layout: "Y",
        test: true,
        phase: "test",
      });
    }
  }
  return [phase1_variables, phase2_variables, test_variables];
}

/******************************************************************************************************************************************/
// instructions and video transitions

var instructions1 = {
  type: "instructions-image-and-sound",
  pages: [
    "instructions/Screenshot (195).png",
    "instructions/Screenshot (196).png",
    "instructions/Screenshot (197).png",
    "instructions/Screenshot (198).png",
    "instructions/Screenshot (199).png",
  ],
  audio: [
    "recordings/SLP Instruction Recordings/SLP_2new.mp3",
    "recordings/SLP Instruction Recordings/SLP_3.mp3",
    "recordings/SLP Instruction Recordings/SLP_4.mp3",
    "recordings/SLP Instruction Recordings/SLP_5.mp3",
    "recordings/SLP Instruction Recordings/SLP_6.mp3",
  ],
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var pre_task1 = {
  type: "instructions-image-and-sound",
  pages: [`instructions/Screenshot (200).png`],
  audio: ["recordings/SLP Instruction Recordings/SLP_7.mp3"],
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var post_task1 = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["1", "2", "3", "4"].includes(group)) {
      trial.pages = [`instructions/Screenshot (201).png`];
    } else if (["5", "6", "7", "8"].includes(group)) {
      trial.pages = [`instructions/Screenshot (202).png`];
    }
  },
  type: "instructions-image-and-sound",
  audio: ["recordings/SLP Instruction Recordings/SLP_9+10.mp3"],
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var instructions2 = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["2", "4", "5", "7"].includes(group)) {
      trial.pages = [
        `instructions/Screenshot (209).png`,
        `instructions/Screenshot (211).png`,
      ];
      trial.audio = [
        "recordings/SLP Instruction Recordings/SLP_18.mp3",
        "recordings/SLP Instruction Recordings/SLP_19.mp3",
      ];
    } else if (["1", "3", "6", "8"].includes(group)) {
      trial.pages = [
        `instructions/Screenshot (208).png`,
        `instructions/Screenshot (210).png`,
      ];
      trial.audio = [
        "recordings/SLP Instruction Recordings/SLP_17.mp3",
        "recordings/SLP Instruction Recordings/SLP_19.mp3",
      ];
    }
  },
  type: "instructions-image-and-sound",
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var post_task2 = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["1", "3", "5", "7"].includes(group)) {
      trial.pages = [`instructions/Screenshot (214).png`];
    } else if (["2", "4", "6", "8"].includes(group)) {
      trial.pages = [`instructions/Screenshot (212).png`];
    }
  },
  type: "instructions-image-and-sound",
  audio: ["recordings/SLP Instruction Recordings/SLP_21+23.mp3"], //incorrect fix
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var instructions_test = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["1", "2", "3", "4"].includes(group)) {
      trial.pages = [`instructions/Screenshot (215).png`];
    } else if (["5", "6", "7", "8"].includes(group)) {
      trial.pages = [`instructions/Screenshot (213).png`];
    }
  },
  type: "instructions-image-and-sound",
  audio: ["recordings/SLP Instruction Recordings/SLP_22+24.mp3"],
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var goodbye = {
  type: "instructions-image-and-sound",
  pages: [`instructions/Screenshot (216).png`],
  audio: ["recordings/SLP Instruction Recordings/SLP_26.mp3"],
  show_clickable_nav: true,
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var video_transition_start = {
  type: "video-button-response",
  stimulus: ["stimuli/videos/start to pink.mp4"],
  width: 1400,
  height: 800,
  response_ends_trial: true,
  response_allowed_while_playing: false,
  choices: ["Next"],
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var video_transition1 = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["1", "2", "3", "4"].includes(group)) {
      trial.stimulus = ["stimuli/videos/pink to blue.mp4"];
    } else if (["5", "6", "7", "8"].includes(group)) {
      trial.stimulus = ["stimuli/videos/pink to orange.mp4"];
    }
  },
  type: "video-button-response",
  width: 1400,
  height: 800,
  response_ends_trial: true,
  response_allowed_while_playing: false,
  choices: ["Enter the world"],
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var video_transition_delay = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["1", "2", "3", "4"].includes(group)) {
      trial.stimulus = ["stimuli/videos/blue to pink.mp4"];
    } else if (["5", "6", "7", "8"].includes(group)) {
      trial.stimulus = ["stimuli/videos/orange to pink.mp4"];
    }
  },
  type: "video-button-response",
  width: 1400,
  height: 800,
  response_ends_trial: true,
  response_allowed_while_playing: false,
  choices: ["Next"],
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var video_transition2 = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["2", "4", "6", "8"].includes(group)) {
      trial.stimulus = ["stimuli/videos/pink to orange.mp4"];
    } else if (["5", "7", "1", "3"].includes(group)) {
      trial.stimulus = ["stimuli/videos/pink to blue.mp4"];
    }
  },
  type: "video-button-response",
  stimulus: [video2],
  width: 1400,
  height: 800,
  response_ends_trial: true,
  response_allowed_while_playing: false,
  choices: ["Enter the world"],
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var video_transition_3_trial = {
  on_start: function (trial) {
    var group = jsPsych.data.getURLVariable("exp");
    if (["2", "4"].includes(group)) {
      trial.stimulus = ["stimuli/videos/orange to blue.mp4"];
    } else if (["5", "7"].includes(group)) {
      trial.stimulus = ["stimuli/videos/blue to orange.mp4"];
    }
  },
  type: "video-button-response",
  stimulus: [video2],
  width: 1400,
  height: 800,
  response_ends_trial: true,
  response_allowed_while_playing: false,
  choices: ["Enter the world"],
  trial_duration: 300000, 
  on_finish(data){
    unattended_trials += data.unattended_trials
  }
};

var video_transition_3 = {
  timeline: [video_transition_3_trial],
  conditional_function: function () {
    var group = jsPsych.data.getURLVariable("exp");
    if (["2", "4", "5", "7"].includes(group)) {
      return true;
    } else {
      return false;
    }
  },
};

/******************************************************************************************************************************************/
// Main task

var count_repetitions = 1;

var map_trial = {
  on_start: function (trial) {
    if (count_repetitions <= 15) {
      trial.data = {
        repetition: count_repetitions,
        phase: jsPsych.timelineVariable("phase", true),
      };
    } else {
      trial.data = {
        repetition: count_repetitions,
        exclusion: true,
        phase: jsPsych.timelineVariable("phase", true),
      };
    }
  },
  type: "spatial-layout-map",
  background: jsPsych.timelineVariable("map"),
  background_height: 800,
  background_width: 1400,
  images: jsPsych.timelineVariable("image_set"),
  correct_response: jsPsych.timelineVariable("correct_response"),
  button_image: "stimuli/black_card.png",
  disabled_button_image: "stimuli/grey_card.png",
  overlapping: jsPsych.timelineVariable("overlapping"),
  layout: jsPsych.timelineVariable("layout"),
  card_height: 120,
  card_width: 75,
  response_ends_trial: false,
  correct_sound: "stimuli/correct_sound.wav",
  test: jsPsych.timelineVariable("test"),
  trial_duration: 420000,
  on_finish: function (data) {
    if (data["number of touches"] == 0){
      unattended_trials +=1
    }
  },
};

var practice = {
  timeline: [map_trial],
  timeline_variables: [
    {
      correct_response: practice_set[0],
      image_set: practice_set,
      map: "stimuli/pink world.png",
      overlapping: false,
      layout: "P",
      test: false,
      phase: "practice main task",
    },
    {
      correct_response: practice_set[1],
      image_set: practice_set,
      map: "stimuli/pink world.png",
      overlapping: false,
      layout: "P",
      test: false,
      phase: "practice main task",
    },
  ],
  randomize_order: true,
};

var count_perfect_reps = 0;

var phase1 = {
  timeline: [map_trial],
  timeline_variables: create_timeline_variables()[0],
  randomize_order: true,
  loop_function: function (data) {
    count_repetitions += 1;
    if (
      jsPsych.data
        .getLastTimelineData()
        .filter({ "number of touches": 1 })
        .count() == 16
    ) {
      count_perfect_reps += 1;
    } else {
      count_perfect_reps = 0;
    }
    if (count_perfect_reps == 2) {
      count_repetitions = 1;
      return false;
    } else if (count_repetitions >= 15) {
      count_repetitions = 1;
      return false;
    } else {
      return true;
    }
  },
};

var phase2 = {
  timeline: [map_trial],
  timeline_variables: create_timeline_variables()[1],
  randomize_order: true,
  loop_function: function (data) {
    count_repetitions += 1;
    if (
      jsPsych.data
        .getLastTimelineData()
        .filter({ "number of touches": 1 })
        .count() == 16
    ) {
      count_perfect_reps += 1;
    } else {
      count_perfect_reps = 0;
    }
    if (count_perfect_reps == 2) {
      count_repetitions = 1;
      return false;
    } else if (count_repetitions >= 15) {
      count_repetitions = 1;
      return false;
    } else {
      return true;
    }
  },
};

var test = {
  timeline: [map_trial],
  data: { phase: "test" },
  timeline_variables: create_timeline_variables()[2],
  randomize_order: true,
};
