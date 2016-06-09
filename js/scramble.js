/// <reference path="jquery-1.11.3.js" />
var squareCount = 16;
var emptySquare;

$(document).ready(function () {

  jQuery.event.props.push("dataTransfer");
  createBoard();
  initGame();
  $("#gameboard").on('dragstart', dragstarted);
  $("#gameboard").on('dragend', dragend);
  $("#gameboard").on('dragenter', function(evt){ evt.preventDefault();});
  $("#gameboard").on('dragover', function(evt){ evt.preventDefault();});
  $("#gameboard").on('drop', dropped);

  $("#level").on("change", resetBoard)
});

function resetBoard() {
  createBoard();
  initGame();
}

function createBoard() {
  // body...
  var level = Number($("#level").val()) ;
  $('#gameboard').css('width', (85 * level + 85) + 'px');
  $('#gameboard').html("");
  squareCount = level * level;
  for(var i = 0; i < squareCount; i++)
  {
    $square = $('<div id="square' + i + '" data-square="'+ i + '" class="square"></div>');
      $square.appendTo($('#gameboard'));
  }
}

function initGame() {
  var level = Number($("#level").val()) ;
  squareCount = level * level;
  emptySquare = squareCount - 1;
  for(var i = 0; i < emptySquare; i++)
  {
    var $square = $("#square" + i);
    var $tile = $('<div draggable="true" id="tile' + i + '" data-tile="'+ i + '" class="tile">' + (i + 1) + '</div>');
    $tile.appendTo($square);
  }
}

function dragstarted(e) {
  var $tile = $(e.target);
  $tile.addClass('dragged');
  var sourceLocation = $tile.parent().data('square');
  e.dataTransfer.setData('text', sourceLocation.toString());
  e.dataTransfer.effectAllowed = 'move';
}

function dragend(e) {
  $(e.target).removeClass('dragged');
}

function dropped(e) {
  $square = $(e.target);
  var sourceLocation = Number(e.dataTransfer.getData('text'));
  moveTile(sourceLocation);
}

function moveTile(sourceLocation) {
  var distance = sourceLocation - emptySquare;
  if (distance < 0)
  {
    distance = -(distance);
  }
  if (distance == 1 || distance == 4)
  {
    swapTileAndEmptySquare(sourceLocation);
  }
}

function swapTileAndEmptySquare(sourceLocation)
{
  var $draggedItem = $('#square' + sourceLocation).children();
  $draggedItem.detach();
  var $target = $('#square' + emptySquare);
  $draggedItem.appendTo($target);
  emptySquare = sourceLocation;
}
