/**
 * jspsych-html-button-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

 jsPsych.plugins['spatial-layout-map'] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: 'spatial-layout-map',
      description: '',
      parameters: {
        background: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Background',
          default: undefined,
          description: 'The background image to be displayed'
        },
        background_height:{
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Image height',
            default: null,
            description: 'Set the image height in pixels'
        },
        background_width: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Image width',
            default: null,
            description: 'Set the image width in pixels'
        },
        images: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Images',
          default: undefined,
          array: true,
          description: 'Images to be displayed.'
        },
        button_image: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Button image',
          default: undefined,
          description: 'The image of the button.'
        },
        disabled_button_image: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Disabled Button image',
          default: undefined,
          description: 'The image of the disabled button.'
        },
        card_height:{
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Image height',
            default: null,
            description: 'Set the image height in pixels'
        },
        card_width: {
            type: jsPsych.plugins.parameterType.INT,
            pretty_name: 'Image width',
            default: null,
            description: 'Set the image width in pixels'
        },
        correct_response: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Correct response',
            default: undefined,
            description: 'The search card to be displayed on the side of the map'
          },
        prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Prompt',
          default: null,
          description: 'Any content here will be displayed under the button.'
        },
        trial_duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Trial duration',
          default: null,
          description: 'How long to show the trial.'
        },
        response_ends_trial: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Response ends trial',
          default: true,
          description: 'If true, then trial will end when user responds.'
        },
        overlapping: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Overlapping',
          default: true,
          description: 'Overlapping/non-overlapping map.'
        },
        test: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Test',
          default: false,
          description: 'Test/Not test phase.'
        },
        layout: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Layout',
          default: undefined,
          description: 'Layout, write B or Y (for blue or yellow)'
        },
        correct_sound: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Correct sound',
          default: null,
          description: 'Path to correct sound'
        }
      }
    }
  
    plugin.trial = function(display_element, trial) {
      // display background
      var html = '<div class="map"> <img src="'+trial.background+'" id="background" width="100%" height="100%"'+`>
      <img src="`+trial.correct_response+`" id="correct_card" width="100%" height="100%">`;
      //display buttons
      var layout = trial.layout
      if(trial.overlapping){
        for (var i = 1; i < trial.images.length+1; i++){
        html += ` <img class="flipCard" src="`+trial.disabled_button_image+`" id="`+layout+`-btn`+i+'" width="100%" height="100%"></img>'
      }
      layout += "O"
    }
      for (var i = 1; i < trial.images.length+1; i++) {    
        html+= '<div class="flipCard"  id="' +layout+'-btn' + i + '">' 
        if(trial.images[i-1] == trial.correct_response){
            html+= '<div class="card" data-choice="'+i+'" correct="true">' }
        else{
            html+= '<div class="card" data-choice="'+i+'" correct="false">'
        } 
          html+= `<div class="side front"><img src="`+trial.button_image+ '" width="100%" height="100%"'+`></div>
          <div class="side back"><img src="`+trial.images[i-1]+'" width="100%" height="100%"'+`></div>
        </div> 
    </div>`
      }
      html += '</div>';
  
      //show prompt if there is one
      if (trial.prompt !== null) {
        html += trial.prompt;
      }
      if (trial.test){
        html += `<button disabled id="btn" style="position:absolute; right:50%; width: 200px"><b>NEXT</b></button>`
      }

      display_element.innerHTML = html;
  
      // start time
      var start_time = performance.now();

      // correct sound 
      if (trial.correct_sound != null){
      var correct_sound = new Audio(trial.correct_sound);
      }

      // add event listeners to buttons
      var cardToFlip = document.querySelectorAll(".card");
      for (var card of cardToFlip){
      card.addEventListener("click", after_response);
      } 
      
      if (trial.test){
      var button = document.getElementById("btn");
      button.addEventListener("click", end_trial);}
      


      // store response
      var response = {
        buttons: [],
        times: [],
        n_touches: 0
        /*mouse_movements: []*/
      };

        /*    // mouse event listener
      $("body").mousemove(function(e) {
        response.mouse_movements.push({x: e.clientX, y: e.clientY, time: performance.now() })
          })*/


      // variable to be updated in order to keep track of times between clicks
      var recent_click_time = performamce.now()

      // function to handle responses by the subject
      function after_response() {
        console.log(this)
        var flipped_card = this.classList
        console.log(flipped_card)
        var choice = this.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
        var correct_choice = this.getAttribute('correct');
        if(correct_choice == "true"){
          if (trial.correct_sound != null && !trial.test){
            correct_sound.play()
            }
        }
        console.log(correct_choice)
        // measure rt for every touch and update recent time variable
        var end_time = performance.now();
        var rt = end_time - recent_click_time;
        recent_click_time = performance.now();
        //upade the response variable
        response.times.push(rt);
        response.buttons.push(choice);
        response.n_touches += 1; 
        // flip card, disable all other other cards from flipping
        if (!trial.test){
        flipped_card.toggle("flipped");
        console.log(flipped_card)
        $('.card').css("pointer-events", "none");
        var callCount = 1;
        var repeater = setInterval(function () {
        if (callCount < 2) {
            flipped_card.toggle("flipped");
            if(correct_choice == "true"){
              // when correct card is found, end trial
              end_trial();
              }
            else{
              $('.card').css("pointer-events", "auto");
            }  
            callCount += 1;
        }else {
            clearInterval(repeater);
                    }}, 1250);}
        else{
          var checkedcards = document.querySelectorAll(".flipCard .card.clicked");
          console.log(checkedcards)
          if(correct_choice == "true"){
            response.correct = 1
          }
          else{
            response.correct = 0
          }
          if (checkedcards.length < 1){
            flipped_card.toggle("clicked");
            document.getElementById("btn").disabled = false;
          }
          else if(checkedcards.length ==  1){
            if (choice == checkedcards[0].getAttribute('data-choice')){
              flipped_card.toggle("clicked");
              document.getElementById("btn").disabled = true;
            }
            else{
              for(const card of checkedcards){
                card.classList.toggle("clicked")
              }
              flipped_card.toggle("clicked")
            }
          }
          else{
            document.getElementById("btn").disabled = true;
            return false
          }
        }}

      // helper to extract the object name from string
      function get_name(str){
        if(str.indexOf('/') != -1){
          return str.slice(str.lastIndexOf("/")+1,str.lastIndexOf("."))}
        else{ 
          return str.slice(0,str.lastIndexOf("."))}}

      // helper to extract array of objects clicked from array of the indexes of buttons pressed
      function get_object_array(){
        var object_array = []
        for (let button of response.buttons){
          object_array.push(get_name(trial.images[parseInt(button)-1]))
        }
        return object_array
      }
  
      // function to end trial when it is time
      function end_trial() {
  
        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();
  
        // gather the data to store for the trial
        if (!trial.test){
        var trial_data = {
          "time": response.rt,
          "background": get_name(trial.background),
          "click-by-click data": {"touch locations": response.buttons ,"touch objects": get_object_array(), "reaction times": response.times},
          //"mouse movements": response.mouse_movements,
          "final time": response.times.reduce((a, b) => a + b, 0), 
          "number of touches": response.n_touches,
          "goal object": get_name(trial.correct_response),
          "goal location": (trial.images.indexOf(trial.correct_response) + 1)
        };}
        else{
          var trial_data = {
            "time": response.rt,
            "background": get_name(trial.background),
            "click-by-click data": {"touch locations": response.buttons ,"touch objects": get_object_array(), "reaction times": response.times},
           /* "mouse movements": response.mouse_movements,*/
            "final time": response.times.reduce((a, b) => a + b, 0), 
            "number of touches": response.n_touches,
            "goal object": get_name(trial.correct_response),
            "goal location": (trial.images.indexOf(trial.correct_response) + 1),
            "correct": response.correct
            
          };}
  
        // clear the display
        display_element.innerHTML = '';
  
        // move on to the next trial
        jsPsych.finishTrial(trial_data);
      };
  
      // end trial if time limit is set
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function() {
          end_trial();
        }, trial.trial_duration);
      }
  
    };
  
    return plugin;
  })();
  