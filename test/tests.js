test( "hello test", function() {
	ok( 1 == "1", "Passed!" );
});

test( "global variables initial state test", function() {
	ok( jQuery.isEmptyObject(allCategoriesJson), "All Categories JSON empty.");
	equal( shuffled.length, 0, "Shuffled array is empty.");
	equal( currentIndex, 0, "Current Shuffled Index is 0.");
	equal( instructions.length, 2, "Instructions array length is 2.");
	equal( instructions[0], "do an impression of", "First instruction value.");
	equal( instructions[1], "doing an impression of", "Second instruction value.");
});