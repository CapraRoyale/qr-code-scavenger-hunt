// _______________________________________________________ Algorithm ___________________________________________________________________ //

// The objective is to use jQuery to render two arguments (localStorage value + call-back function) to have current clue rendered onto the HTML page.
// 1. Retrieve the localStorage value from the 'key'
// 2. Follow-up with a call-back f(x)

// _______________________________________________________ Program _____________________________________________________________________ //
// The ready() method is used to make a function available after the document is loaded. Whatever code you write inside the $(document ).ready() method will run once the page DOM is ready to execute JavaScript code.
$(document).ready(function () {

    // dbi.getClue is from: dbControll.js which will retrieve it's data.
    dbi.getClue(localStorage.getItem("code"), function (clueText) {

        //This console.log('getClue') will test out whether a clue was deployed or not.
        console.log('getClue');
        console.log(clueText);
        // Call-back Function:
        if (clueText) {
            $("#renderArea").append(clueText);
        } else {
            $("#renderArea").append('No Clue');
        }
    });

});