waitForAuth(function () {
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
    dbi.getSingleGame(gameCode, function (result) {
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
                value: result.clues[i],
                readonly: 'true',
                class: 'edit-me clue'
            });
            var hintInput = $("<input>", {
                type: "text",
                id: "hint" + i,
                value: result.hints[i],
                readonly: 'true',
                class: 'edit-me hint'
            });
            //Attach variable content to table row element and append to the page to generate a form
            td0.append(i + 1);
            td1.append(clueInput);
            td2.append(hintInput);

            //
            tr.append(td0, td1, td2);
            $("#clues-and-hints>tbody").append(tr);

        }

        // Function that Siege wrote earlier, slightly modified
        var qrGen = function (qrContent) {
            // Create variable to contain Google QR code generating API according to input qrContent
            var qr = "https://chart.googleapis.com/chart?chs=100x100&cht=qr&choe=UTF-8&chl=" + encodeURI(`https://landgod.github.io/ClueHunt-QR/index.html?code=${qrContent}`);
            console.log(qr);
            // Create variable to contain HTML element 
            var img = $("<img>")
            img.attr("src", qr);
            
            return img;
        }

        $('#print-game').click(function () {
            $('.container').empty();
            $('.container').html("<table><tbody id='print-table'></tbody></table>")
            let tablebody = $('#print-table');

            for (let i = 0; i < result.clueCodes.length; i++) {
                let newRow = $('<tr>')
                let newCell1 = $('<td>')
                let newCell2 = $('<td>')
                let newCell3 = $('<td>')

                newCell1.text(`Clue ${i+1}:`)
                newCell2.append(qrGen(result.clueCodes[i]));
                newCell3.text(result.clueCodes[i].slice(1));

                newRow.append(newCell1)
                newRow.append(newCell2)
                newRow.append(newCell3)

                tablebody.append(newRow);
            }





        });

        // New click event for edit button that makes the form fields editable
        $('#edit-new-game').click(function(event){

            event.preventDefault()

            // Remove button from dom after its clicked since it's purpose has been served.
            $('#edit-new-game').detach();

            // Make form fields editable
            $('.edit-me').removeAttr('readonly');

            // Reveal submit edits button
            $('#submit-game-edit').show();

            // Create click event listener for newly revealed submit edits button
            $('#submit-game-edit').click(function(event){

                event.preventDefault()

                // Make some empty lists
                let clueEdits = [];
                let hintEdits = [];

                // Iterate through current text field values for clues and hints appending to lists as we go
                $('.clue').each(function(){
                    clueEdits.push($(this).val());
                });

                $('.hint').each(function(){
                    hintEdits.push($(this).val());
                });

                // Call update function with current database id for game, plus those lists we just created
                dbi.updateGame(gameCode, clueEdits, hintEdits, function(){location.reload()});

                // Just reload the page since that's the easiest way to reset
                

            });

        });

    });

    



})