var allCategoriesJson = {}
var shuffled = []
var currentIndex = 0
var instructions = ["do an impression of", "doing an impression of"]

$(function () { // wait for document ready


	$.ajax({
            type: 'GET',
            url: 'data.json',
            dataType: 'json',
            success: function(d) {
            	allCategoriesJson = d

            	// TODO filter by categories 

            	// concat arrays and shuffle
            	var allData = []
            	for (var i = 0; i < allCategoriesJson.length; i++) {
				    allData = allData.concat(allCategoriesJson[i].members)
				}
				// create the category boxes
				createCategoryButtons()

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

function createCategoryButtons() {
	var buttonGroup = $('<div />', {
		        "class": 'btn-group',
		        "data-toggle": "buttons"})
	var buttonLabel = $('<label />', {
		        "class": 'btn btn-primary btn-lg'})
  	for(var i = 0; i < allCategoriesJson.length; i++) {
  		var buttonInput = "<input type=\"checkbox\" autocomplete=\"off\" checked=\"\">"
  		var button = buttonLabel.clone().append(buttonInput).append(allCategoriesJson[i].category)
  		buttonGroup.append(button)
  	}
  	$('.container').prepend(buttonGroup);
  	$('.btn').click(function() {
	    $('.btn').addClass('active').not(this).removeClass('active');

	    // TODO: re-filter categories
	});
}


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