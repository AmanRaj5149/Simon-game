const buttonColors = ['red', 'yellow', 'green', 'sky'];
let gamePattern = [];
let userPattern = [];
let start = false;
let level = 0;



$(document).keypress( () =>{
   if(!start){
      sequenceTracker();
      start = true;
   }
});

$('.color-box').click( function(){
   var clickedColor = $(this).attr('id');
   userPattern.push(clickedColor);
   buttonAudio(clickedColor);
   pressAnimation(clickedColor);

   patternCheck( (userPattern.length - 1) );
});

function patternCheck(index){
   if( userPattern[index] === gamePattern[index] ){

      if( userPattern.length === gamePattern.length ){
         setTimeout( () =>{sequenceTracker();}, 500 );
      }
   }else{
      buttonAudio('wrong');
      $('body').addClass('game-over');
      setTimeout( () => {$('body').removeClass('game-over');}, 200 );
      $('.heading').text('Game Over Press a key to start again');
      restart();
   }
}

function sequenceTracker(){
   userPattern = [];
   level++;
   $('.heading').text(`Level ${level}`);

   var random = Math.floor( Math.random() * 4 );
   var selectedColor = buttonColors[random];
   gamePattern.push(selectedColor);

   $(`#${selectedColor}`).fadeOut(100).fadeIn(100);
   buttonAudio(selectedColor);
}



function buttonAudio(color){
   var audio = new Audio(`sounds/${color}.mp3`);
   audio.play();
}
function pressAnimation(color){
   $(`#${color}`).addClass('pressed');
   setTimeout( () =>{
      $(`#${color}`).removeClass('pressed');
   }, 100);
}


function restart(){
   gamePattern = [];
   start = false;
   level = 0;
}
