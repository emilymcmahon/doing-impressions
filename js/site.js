var json = {}
var shuffled = []
var idx = 0
$( document ).ready(initializeOnDocumentReady);

function initializeOnDocumentReady() {
	getData();
}

function getData() {
	$.ajax({
        type: 'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(d) {
        	json = d
			initCategoryButtons();
			filterData();

			// bind refresh button
			$('#refresh').click(function() {
				updateContent($(".content"));
			});
			
			// bind individual cards
			$('.noun').click(function() {
				updateContent($(this).find(".content"));
			});
        }  ,
        error: function(a,b,c) {
        	alert(c);
        }  
    });
}

function filterData() {
	var cats = []
	var data = []

	// get active categories
	$('.btn-group .btn.active').each(function() {
		cats.push(this.id)
	});

	// concat arrays in active categories
	for (var i = 0; i < json.length; i++) {
		if (cats.length == 0 || cats.includes(json[i].key)) {
			data = data.concat(json[i].members);
		} 
	}
	
	shuffled = shuffle(data);
	updateContent($(".content"));

	return data;
}

function initCategoryButtons() {
	var buttonGroup = $('<div />', {
		        "class": 'btn-group ',
		    	"id": "cat-buttons"})
	var buttonTemplate = $('<button/>', 
		{"class": 'btn btn-info active',
		 "type": "button"})
  	for(var i = 0; i < json.length; i++) {
  		var button = buttonTemplate.clone();
  		button.append(json[i].category);
  		button.attr('id', json[i].key)

		button.click(function() {
		    $(this).toggleClass('active');
		    filterData();
		});

  		buttonGroup.append(button)
  	}
  	$('.container').prepend(buttonGroup);

}

function getNext() {
	var oldIndex = idx;
	idx++;
	if (idx >= shuffled.length) {
		shuffled = shuffle(shuffled)
	}
	return shuffled[idx];
}

function updateContent(c) {
	$(c).each(function() {
		$(this).text(getNext());	
		var i = $(this).parent().prev(".instruction");
		var t = ($(i).hasClass('instruction0'))
			? "You're "
			: "doing an impression of ";
		if ($(this).text() == $(this).text().toLowerCase()) {
			var vowellist = ['a','e','i','o','u'];
			t += (vowellist.includes($(this).text()[0])) 
					? "an " : "a ";
		}
		$(i).text(t);
	})

}

function shuffle(array) {
  console.log("shuffling");
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
  // After any shuffle, reset the idx to 0
  idx = 0
  return array;
}