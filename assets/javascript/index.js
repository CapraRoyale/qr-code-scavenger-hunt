    // ___________________________________________________Algorithm _____________________________________________________________________//
    // 1) Basically the objective here is to pass user data -> via their special login code to link them to their 'current' clue page.

        // a) The user enters the data through the form.

        // b) The form takes the user input and saves it
            // i. At the same time -> upon the on-click event, the user will be re-directed to the page where the form is connected to. (In this case, it will be the Clue Page)

        // c) When the user is directed to the Clue Page, they will see the current clue, along with their code in local storage?

    // How will this be done?
    //1) The user will enter their personal code in the form.
    //2) Then the form-data is saved in localStorage ->
    //3) User will be redirected to new page. clue_page.html


    // Possible ideas for the method:
        // localStorage
        // take data from local storage -> render -> clear local storage

    // ___________________________________________________Program _____________________________________________________________________//


// On-click Functions:


// _______________Submit User Code -> Go To Clue Page_____________________//
// When user enters input this code will be stored locally.
function store() {
// Declared a variable: codeVariable | where, the user inputs their data in the id, #codeForm, and will be transferred to localStorage.
var codeVariable = document.getElementById("codeForm");
localStorage.setItem("code", codeVariable.value);
};

// After local storage has been saved -> redirect to clue_page.html
function clueFunction(){
window.open("clue_page.html");
};

// ____________________New Game_________________________//
// This line of code is the onclick function for the <New Game button> which will lead the user to: new_game.html
function newGame() {
    window.open("new_game.html");
};

// ____________________Login_________________________//

// This line of code is the onclick function for the <Login button> which will lead the user to: login.html
function login() {
    window.open("login.html")
};







