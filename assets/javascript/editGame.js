waitForAuth(function() {
    //Create variable to grab content from URL
    var grabString = location.search;
    //Split the string after the '=' sign and contain new string in a variable
    // console.log(grabString);
    var temp = grabString.split("=");
    //Decode the string into valid text for URL encoded characters
    // console.log(temp);
    var gameCode = decodeURI(temp[1]);
    console.log(gameCode);
    // 
    // var editGame = new Promise(function(resolve, reject) {
    //     //If the request is succesful, resolve the request by populating game code into page
    //     resolve(
    //         gameCode
    //     );
    //     //If the request is unsuccesful, throw an error
    //     reject(
    //         console.log(err)
    //     );
    // })
    // editGame;
    //
    $("#clues-and-hints>tbody").empty();
    $("#clues-and-hints").show();
    $("#submit-game-edit").hide();
    //
    dbi.getSingleGame(gameCode, function(result) {
        for (let i = 0; i < result.clues.length; i++) {
            console.log(result.clues[i], result.hints[i]);

            var tr = $("<tr>");
            var td0 = $("<td>");
            var td1 = $("<td>");
            var td2 = $("<td>");
            //Generate variables to contain HTML elements for the form
            var clueInput = $("<input>", {
                type: "text",
                id: "clue" + i,
                value: result.clues[i]
            });
            var hintInput = $("<input>", {
                type: "text",
                id: "hint" + i,
                value: result.hints[i]
            });
            //Attach variable content to table row element and append to the page to generate a form
            td0.append(i + 1);
            td1.append(clueInput);
            td2.append(hintInput);

            //
            tr.append(td0, td1, td2);
            $("#clues-and-hints>tbody").append(tr);

        }
    });
})