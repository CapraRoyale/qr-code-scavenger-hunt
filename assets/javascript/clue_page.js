// _______________________________________________________ Algorithm ___________________________________________________________________ //

// Make sure dbControl.js is loaded
//Clue ID from local storage -> or try localStorage.getItem
//-> Then input an onClick function (event Listener) -> it will call the function with a single argument -> i.e. clueText(str1) -> use jQuery to // // render the function -> refer to an empty <div></div> where it will be rendered) | **Update: named div : #clueLogic

// _______________________________________________________ Program _____________________________________________________________________ //
// The ready() method is used to make a function available after the document is loaded. Whatever code you write inside the $(document ).ready() method will run once the page DOM is ready to execute JavaScript code.
$(document).ready(function () {

    // dbi.getClue is from: dbControll.js which will retrieve it's data.
    dbi.getClue(localStorage.getItem("code"), function (clueText) {

        //This console.log('getClue') will test out whether a clue was deployed.
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