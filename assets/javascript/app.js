//When document loads, execute code
$(document).ready(function() {
    //Hide the database submittal and table headers
    $("#db-gen-new-game").hide();
    $("#clues-and-hints").hide();
    //Create a click condition for the form that generates a value based on the input number
    $("#create-new-game>#new-game").click(function() {
        //Create variables to contain form inputs

        ownerName = $("#owner-name").val();
        groupName = $("#group-name").val();
        $("#clues-and-hints-header").prepend(ownerName, " ", groupName);
        //Create variable based on input number for clues
        var generateClues = $("#number-of-clues").val();
        //Make sure the vlue submitted is at least 1
        if (generateClues >= 1) {
            console.log(generateClues);
            //Generate an instance of Table data for each integer
            for (let i = 0; i < generateClues; i++) {
                console.log("clue" + i);
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
                })
                var hintInput = $("<input>", {
                        type: "text",
                        id: "hint" + i
                    })
                    //Attach variable content to table row element and append to the page to generate a form
                td0.append(i + 1);
                td1.append(clueInput);
                td2.append(hintInput);
                tr.append(td0, td1, td2);
                $("#clues-and-hints>tbody").append(tr);

            }
            //Hide the submit form
            $(".form-group").hide();
            //Show the database submit buttons and table headers
            $("#db-gen-new-game").show();
            $("#clues-and-hints").show();
        }

    });
});