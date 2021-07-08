//===========================================================================================================================================
// Post Experiment Questionnaire

var first_question_options = [`A mouse`,
`A trackpad`,
`Touch screen`, "other"
];

first_question = {
  data: {phase: 'PEQ'},
  type: 'survey-multi-choice',
  preamble: '<b> Post Experiment Questionnaire</b>',
  questions: [
    {prompt: `<b> 1. For the card game tasks, what did you use to select the cards?</b>
`, options: first_question_options, required: true, horizontal: false, name: '1'}
  ]}

var second_question = {
  type: 'survey-text',
  preamble: '<b>2. In the card game tasks, what was your strategy when learning where the objects were located?</b>',
  data: {phase: 'PEQ'},
  questions: [
    {prompt: "a) First card game:", rows: 5, columns: 40, name: '2a', required: true},
    {prompt: "b) Second card game:", rows: 5, columns: 40, name: '2b', required: true}
  ],
};

questions_three_four = {
  data: {phase: 'PEQ'},
  type: 'survey-multi-choice',
  questions: [
    {prompt: `In the second card game, were you thinking of the cards you learned in the first card game? 
`, options: ['Yes', 'No'], required: true, horizontal: false,  name: '3'},{
prompt: `If yes, did this help or distract you? (optional)
`, options: ['It helped me', 'It distracted me', 'It had no effect'], required: false, horizontal: false, name: '4'
}
  ]  
}

var question_four_part_two = { 
  type: 'survey-text',
  data: {phase: 'PEQ'},
  questions: [
    {prompt: "Tell us more: (optional)", rows: 5, columns: 40, name: '4b', required: false}  ],
};

question_six = {
  type: 'survey-text',
  data: {phase: 'PEQ'},
  questions: [
    {prompt: ` <b> 6. List the tasks from easiest to hardest. </b> <br> <br>
      <b>(a)</b> First card game <b>  (b)</b> Number task <b>  (c)</b> Second card game <b>  (d)</b> Final card memory test <br>
e.g. c, a, b, d`, rows: 1, columns: 5, name: '6', required: true}
  ]
}

question_seven = {
  type: 'survey-text',
  data: {phase: 'PEQ'},
  questions: [
    {prompt: "<b> 6. Do you have any other comments? (optional)</b>", rows: 5, columns: 40, name: 'First card game', required: false, name: '6'}
  ],
}

PEQ = {
  timeline: [first_question, second_question, questions_three_four, question_four_part_two, question_six, question_seven]
}
