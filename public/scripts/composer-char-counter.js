$(document).ready(function(){

  $('.new-tweet textarea').on('input', function() {
    var inputLength = this.value.length;
    var $counter = $(this).parent().children('.counter');

    $counter.text(140 - inputLength);

    if(inputLength > 140) {
      $counter.addClass('over-limit');
    } else {
      $counter.removeClass('over-limit');
    }
  });
});