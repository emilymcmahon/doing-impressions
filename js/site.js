var allCatJson = {}
var shuffled = []
var currentIndex = 0
var instructions = ["do an impression of", "doing an impression of"]

$(function () { // wait for document ready
	$.ajax({
            type: 'GET',
            url: 'data.json',
            dataType: 'json',
            success: function(d) {
            	allCatJson = d

            	// TODO filter by categories 

            	// concat arrays and shuffle
            	var allData = []
            	for (var i = 0; i < allCatJson.length; i++) {
				    allData = allData.concat(allCatJson[i].members)
				}
				shuffled = shuffle(allData)
				updateAll()
				// bind refresh button
				$('#refresh').click(updateAll);
				// bind individual cards
				$('.content0').click(function() {
					updateCardAtIndex(0)
				});
				$('.content1').click(function() {
					updateCardAtIndex(1)
				});
            }  ,
            error: function(a,b,c) {
            	alert(c);
            }  
        });
});

function getNext() {
	var oldIndex = currentIndex;
	currentIndex++;
	if (currentIndex >= shuffled.length) {
		// if we've looped through, shuffle again
		currentIndex = 0;
		shuffled = shuffle(shuffled)
	}
	return shuffled[oldIndex];
}

function updateAll() {
	updateCardAtIndex(0)
	updateCardAtIndex(1)
}

function updateCardAtIndex(i) {
	var instructionDiv = $('.instruction' + i)
	instructionDiv.text(instructions[i])
	var content = getNext()
	if (content[0] == content[0].toLowerCase()) {
		instructionDiv.append(" a")
	}
	$('.content' + i).text(content)
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}