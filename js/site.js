var json = {}
var shuffled = []
var data = []
var idx = 0
$( document ).ready(initializeOnDocumentReady);

function initializeOnDocumentReady() {
	data = getData();
}

function initData(data) {
  	console.log("initData");
	var hash = window.location.hash.replace("#","")
	if (hash) {
		var items = hash.split("-")
		try {
			var part0 = window.atob(items[0])
			var part1 = window.atob(items[1])
			if (dataContains(part0) && dataContains(part1)){
				updateContent($('.content0'), part0);
				updateContent($('.content1'), part1);
			} else {
				updateContents($('.content'));
				removeHash();			
			}
		} catch (err) {
			updateContents($('.content'));
			removeHash();
		}
		
	} else {
		updateContents($(".content"));
	}
}

function getData() {
  	console.log("getData");
	$.ajax({
        type: 'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(d) {
        	json = d
			initCategoryButtons();
			data = filterData();
			shuffled = shuffle(data);
			initData(data);

			// bind refresh button
			$('.refresh').click(function() {
				removeHash();
				updateContents($(".content"));
				updatePermalink();
			});
			
			// bind individual cards
			$('.noun').click(function() {
				removeHash();
				updateContents($(this).find(".content"));
				updatePermalink();
			});
			return data;
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

function dataContains(str) {
	if (data.indexOf(str) > -1) {
		return true
	} else {
		return false
	}
}

function getNext() {
	var oldIndex = idx;
	idx++;
	if (idx >= shuffled.length) {
		shuffled = shuffle(shuffled)
	}
	return shuffled[idx];
}

function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}

function updatePermalink() {
	var content0 = $(".content0").text()
	var content1 = $(".content1").text()
	var baseUrl = "http://doingimpressions.com/#"
	var localUrl = "http://127.0.0.1:4000/#"
	var url = baseUrl + window.btoa(content0) + '-' + window.btoa(content1)
	$('#permalink').attr('href', url)
	return 
}

function updateContents(c) {
	$(c).each(function() {
		updateContent($(this), getNext());	
	})
	updatePermalink()
}

function updateContent(container, text) {
	container.text(text)	
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