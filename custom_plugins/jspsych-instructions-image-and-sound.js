/* jspsych-instructions.js
 * Josh de Leeuw
 *
 * This plugin displays text (including HTML formatted strings) during the experiment.
 * Use it to show instructions, provide performance feedback, etc...
 *
 * Page numbers can be displayed to help with navigation by setting show_page_number
 * to true.
 *
 * documentation: docs.jspsych.org
 *
 *
 */

jsPsych.plugins['instructions-image-and-sound'] = (function() {

    var plugin = {};
  
    plugin.info = {
      name: 'instructions-image-and-sound',
      description: '',
      parameters: {
        pages: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          pretty_name: 'Pages',
          default: undefined,
          array: true,
          description: 'Each element of the array is the html content for an image of a single page.'
        },
        audio: {
          type: jsPsych.plugins.parameterType.AUDIO,
          pretty_name: 'Audio',
          default: undefined,
          array: true,
          description: 'The audio to be played in each page.'
      },
      prompts: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Prompts',
        default: null,
        array: true,
        description: 'The text that appears above each image in pages'
      }, 
        key_forward: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Key forward',
          default: 'rightarrow',
          description: 'The key the subject can press in order to advance to the next page.'
        },
        key_backward: {
          type: jsPsych.plugins.parameterType.KEYCODE,
          pretty_name: 'Key backward',
          default: 'leftarrow',
          description: 'The key that the subject can press to return to the previous page.'
        },
        allow_backward: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Allow backward',
          default: true,
          description: 'If true, the subject can return to the previous page of the instructions.'
        },
        allow_keys: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Allow keys',
          default: true,
          description: 'If true, the subject can use keyboard keys to navigate the pages.'
        },
        show_clickable_nav: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Show clickable nav',
          default: false,
          description: 'If true, then a "Previous" and "Next" button will be displayed beneath the instructions.'
        },
        show_page_number: {
            type: jsPsych.plugins.parameterType.BOOL,
            pretty_name: 'Show page number',
            default: false,
            description: 'If true, and clickable navigation is enabled, then Page x/y will be shown between the nav buttons.'
        },
        page_label: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Page label',
          default: 'Page',
          description: 'The text that appears before x/y (current/total) pages displayed with show_page_number'
        },      
        button_label_previous: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Button label previous',
          default: 'Previous',
          description: 'The text that appears on the button to go backwards.'
        },
        button_label_next: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Button label next',
          default: 'Next',
          description: 'The text that appears on the button to go forwards.'
        }
      }
    }
  
    plugin.trial = function(display_element, trial) {
  
      var current_page = 0;
  
      var view_history = [];
  
      var start_time = performance.now();
  
      var last_page_update_time = start_time;

      var audio_sound = new Audio(trial.audio[current_page])
  
      function btnListener(evt){
          audio_sound.pause();
          audio_sound.currentTime = 0;
          evt.target.removeEventListener('click', btnListener);
          if(this.id === "jspsych-instructions-back"){
              back();
          }
          else if(this.id === 'jspsych-instructions-next'){
              next();
          }
      }
  
      function show_current_page() {
        audio_sound = new Audio(trial.audio[current_page])
        var html =''
        if (trial.prompts != null){
          if (!(typeof trial.prompts[current_page] === 'undefined')) {
            html += trial.prompts[current_page]
        }}
        html += `<img src="`+trial.pages[current_page]+`" id="correct_card" width="100%" height="100%">`
        
        trial.pages[current_page];
  
        var pagenum_display = "";
        if(trial.show_page_number) {
            pagenum_display = "<span style='margin: 0 1em;' class='"+
            "jspsych-instructions-pagenum'>"+ trial.page_label + ' ' +(current_page+1)+"/"+trial.pages.length+"</span>";
        }
       
        if (trial.show_clickable_nav) {
  
          var nav_html = "<div class='jspsych-instructions-nav' style='padding: 10px 0px;'>";
          if (trial.allow_backward) {
            var allowed = (current_page > 0 )? '' : "disabled='disabled'";
            nav_html += "<button id='jspsych-instructions-back' class='jspsych-btn' style='margin-right: 5px;' "+allowed+">&lt; "+trial.button_label_previous+"</button>";
          }
          if (trial.pages.length > 1 && trial.show_page_number) {
              nav_html += pagenum_display;
          }
          nav_html+= "<button disabled id='replay-button' class='jspsych-btn'"+
          "style='margin-left: 5px;'>Replay</button>";
          nav_html+= "<button id='pauseplay-button' class='jspsych-btn'"+
          "style='margin-left: 5px;'>Pause/Play</button>";
          nav_html += "<button disabled id='jspsych-instructions-next' class='jspsych-btn'"+
              "style='margin-left: 5px;'>"+trial.button_label_next+
              " &gt;</button></div>";
  
          html += nav_html;
          display_element.innerHTML = html;
          audio_sound.play()
          audio_sound.addEventListener("ended", function(){
            document.querySelector('#jspsych-instructions-next').disabled = false;
          document.getElementById("replay-button").disabled = false})

          if (current_page != 0 && trial.allow_backward) {
            display_element.querySelector('#jspsych-instructions-back').addEventListener('click', btnListener);
          }
  
          display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);

          display_element.querySelector('#replay-button').addEventListener('click', function(){
            audio_sound.pause()
            audio_sound.currentTime = 0
            audio_sound.play()
          });

          display_element.querySelector('#pauseplay-button').addEventListener('click', function(){
            if (audio_sound.paused){
              audio_sound.play()}
            else{
              audio_sound.pause()
            }
            });
          
        } else {
          if (trial.show_page_number && trial.pages.length > 1) {
            // page numbers for non-mouse navigation
            html += "<div class='jspsych-instructions-pagenum'>"+pagenum_display+"</div>"
          } 
          display_element.innerHTML = html;
          audio_sound.play()
          audio_sound.addEventListener("ended", function(){
            document.querySelector('#jspsych-instructions-next').disabled = false;
       });
        }
        
      }
  
      function next() {
  
        add_current_page_to_view_history()
  
        current_page++;
  
        // if done, finish up...
        if (current_page >= trial.pages.length) {
          endTrial();
        } else {
          show_current_page();
        }
  
      }
  
      function back() {
  
        add_current_page_to_view_history()
  
        current_page--;
  
        show_current_page();
      }
  
      function add_current_page_to_view_history() {
  
        var current_time = performance.now();
  
        var page_view_time = current_time - last_page_update_time;
  
        view_history.push({
          page_index: current_page,
          viewing_time: page_view_time
        });
  
        last_page_update_time = current_time;
      }
  
      function endTrial() {
  
        if (trial.allow_keys) {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);
        }
  
        display_element.innerHTML = '';
  
        var trial_data = {
          "view_history": JSON.stringify(view_history),
          "rt": performance.now() - start_time
        };
  
        jsPsych.finishTrial(trial_data);
      }
  
      var after_response = function(info) {
  
        // have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
        keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: [trial.key_forward, trial.key_backward],
          rt_method: 'performance',
          persist: false,
          allow_held_key: false
        });
        // check if key is forwards or backwards and update page
        if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_backward)) {
          if (current_page !== 0 && trial.allow_backward) {
            back();
          }
        }
  
        if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_forward)) {
          next();
        }
  
      };
  
      show_current_page();
  
      if (trial.allow_keys) {
        var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
          callback_function: after_response,
          valid_responses: [trial.key_forward, trial.key_backward],
          rt_method: 'performance',
          persist: false
        });
      }
    };
  
    return plugin;
  })();
  