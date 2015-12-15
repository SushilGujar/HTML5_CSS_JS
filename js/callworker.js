var kamgar = new Worker("js/worker.js");

kamgar.onmessage = function(e){
  console.log('Work completed. Received feedback from Kamgar msg: [' + e.data + ']');
  //postMessage('thank you for sending ' + msg;);
  //return
  $("#msg").append(e.data);
};

kamgar.onerror = function(e){
  console.error(e.message);
}

$('document').ready(function(){
  $("#submit").on("click",  function(){
    kamgar.postMessage($('#msg').val());
    console.log('Work assigned. Awaiting feedback.');
    $("#msg").text("");
  });
})
