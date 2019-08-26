//When document loads, execute code
waitForAuth(function () {
    //Hide the database submittal and table headers
    $("#db-gen-new-game").hide();
    $("#clues-and-hints").hide();
    $("#edit-new-game").hide();
    $("#submit-game-edit").hide();
    //Create a click condition for the form that generates a value based on the input number
    $("#create-new-game>#new-game").click(function () {
        //Create variables to contain form text input
        groupName = $("#group-name").val();
        //Populate header HTML element with variable text
        $("#clues-and-hints-header").prepend(authentication.uName() + "<br>" + groupName);
        //Create variable based on input number for clues
        var generateClues = $("#number-of-clues").val();
        //Make sure the vlue submitted is at least 1
        if (generateClues >= 1) {
            //Generate an instance of Table data for each integer
            for (let i = 0; i < generateClues; i++) {

                //Generate variables to contain table data and table row HTML elements
                //TODO: Generate these variables with a for loop in case we want to easily add more in the future
                var tr = $("<tr>");
                var td0 = $("<td>");
                var td1 = $("<td>");
                var td2 = $("<td>");
                //Generate variables to contain HTML elements for the form
                var clueInput = $("<input>", {
                    type: "text",
                    id: "clue" + i
                });
                var hintInput = $("<input>", {
                    type: "text",
                    id: "hint" + i
                });
                //Attach variable content to table row element and append to the page to generate a form
                td0.append(i + 1);
                td1.append(clueInput);
                td2.append(hintInput);

                //
                tr.append(td0, td1, td2);
                $("#clues-and-hints>tbody").append(tr);

            }
            //Hide the submit form
            $(".form-group").hide();
            //Show the database submit buttons and table headers
            $("#db-gen-new-game").show();
            $("#clues-and-hints").show();

        }
        $("#db-gen-new-game").click(function () {
            //
            var genClueList = [];
            var genHintList = [];
            //
            for (let i = 0; i < generateClues; i++) {
                //
                var currentClue = $("#clue" + i).val().trim();
                //
                if (currentClue != "") {

                    genClueList.push(currentClue);
                    //
                    var currentHint = $("#hint" + i).val();

                    genHintList.push(currentHint);
                    //
                }
            }
            //Take the entry name in Firebase and return it as variable for display
            var localGameID = dbi.saveNewGame(groupName, genClueList, genHintList);
            //
            $("#clues-and-hints>tbody").empty();
            var qrGen = function (qrContent) {
                // Create variable to contain Google QR code generating API according to input qrContent
                var qr = "https://chart.googleapis.com/chart?chs=100x100&cht=qr&choe=UTF-8&chl=" + encodeURI(qrContent);
                console.log(qr);
                // Create variable to contain HTML element 
                var img = $("<img>")
                img.attr("src", qr);
                // Attach newly generated image to the HTML element with the 'images' class
                $(".images").append(img, "<br><br>");
            }
            // Removed some things that didn't do anything or were just for testing -Dan

            $("#edit-new-game").show();
            //Hide the Submit button to prevent repeat submittals and hide the table
            $("#db-gen-new-game").hide();
            $("#clues-and-hints").hide();
            //Populate Text of Header with success message
            $("#clues-and-hints-header").text("Success!");

            //Create edit function for game clues
            $('#edit-new-game').click(function () {
                console.log(localGameID)
                window.location.href = `edit_game.html?game=${localGameID}`;

                // $("#edit-new-game").hide();
                // $("#clues-and-hints>tbody").empty();
                // $("#clues-and-hints").show();
                // $("#submit-game-edit").show();
                // //
                // dbi.getSingleGame(localGameID, function (result) {
                //     for (let i = 0; i < result.clues.length; i++) {

                //         var tr = $("<tr>");
                //         var td0 = $("<td>");
                //         var td1 = $("<td>");
                //         var td2 = $("<td>");
                //         //Generate variables to contain HTML elements for the form
                //         var clueInput = $("<input>", {
                //             type: "text",
                //             id: "clue" + i,
                //             value: result.clues[i]
                //         });
                //         var hintInput = $("<input>", {
                //             type: "text",
                //             id: "hint" + i,
                //             value: result.hints[i]
                //         });
                //         //Attach variable content to table row element and append to the page to generate a form
                //         td0.append(i + 1);
                //         td1.append(clueInput);
                //         td2.append(hintInput);

                //         //
                //         tr.append(td0, td1, td2);
                //         $("#clues-and-hints>tbody").append(tr);

                // }
            // })
        })
        $("#submit-game-edit").click(function () {
            //
            $("#edit-new-game").show();
            $("#clues-and-hints>tbody").empty();
            $("#clues-and-hints").hide();
            $("#submit-game-edit").hide();
            //
            var genClueList = [];
            var genHintList = [];
            //
            for (let i = 0; i < generateClues; i++) {
                //
                var currentClue = $("#clue" + i).val();
                //
                if (currentClue != "") {

                    genClueList.push(currentClue);

                    //
                    var currentHint = $("#hint" + i).val();

                    genHintList.push(currentHint);

                    //
                }
            }
            console.log(genClueList, genHintList);
            dbi.updateGame(localGameID, genClueList, genHintList);
        });

    })
});
})