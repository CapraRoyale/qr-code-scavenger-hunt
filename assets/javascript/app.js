//When document loads, execute codes
$(document).ready(function() {
    //Create a click condition for the form that generates a value based on the input number
    $("#create-new-game>#new-game").click(function() {
        //Create variable based on input number for clues
        var generateClues = $("#number-of-clues").val();
        //Make sure the vlue submitted is at least 1
        if (generateClues >= 1) {
            console.log(generateClues);
            //Generate an instance of Table data for each integer
            for (let i = 0; i < generateClues; i++) {
                console.log("clue" + i)
                var tr = $("<tr>");
                var td = $("<td>");
                var clueInput = $("<input>", {
                    type: "text",
                    id: "clue" + i
                })
                var hintInput = $("<input>", {
                    type: "text",
                    id: "hint" + i
                })
                tr.append(td)
                $("#clues-and-hints>tbody").append(tr);

            }
        }
    });
});