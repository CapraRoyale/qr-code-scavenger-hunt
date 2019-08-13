// Make sure dbControl.js is loaded
//Clue ID from local storage -> or try localStorage.getItem
//-> Then input an onClick function (event Listener) -> it will call the function with a single argument -> i.e. clueText(str1) -> use jQuery to // // render the function -> refer to an empty <div></div> where it will be rendered) | **Update: named div : #clueLogic

// The ready() method is used to make a function available after the document is loaded. Whatever code you write inside the $(document ).ready() method will run once the page DOM is ready to execute JavaScript code.

// Is this necessary?
$(document).ready(function() {

// Is this necessary?
// $("#clueLogic").text(clue);

// Clear absolutely everything stored in localStorage using localStorage.clear() --> don't think this is necessary.
// localStorage.clear();



// dbi.getClue is from: dbControll.js which will retrieve it's data.
dbi.getClue(
    localStorage.getItem("code")
    // This line of code is where .append + localStorage.getItem is applied. -> Rendering portion.
    $("#clueLogic").append

)
