// On-click Functions:

// This line of code is the onclick function for the <submit button> which will lead  the user to: clue_page.html
function clueFunction() {

    // SAVE CODE TO LOCAL STORAGE

    // THEN --> REDIRECT TO HERE:
    window.open("clue_page.html");

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

};

// This line of code is the onclick function for the <New Game button> which will lead the user to: new_game.html
function newGame() {
    window.open("new_game.html");
};

// This line of code is the onclick function for the <Login button> which will lead the user to: login.html
function login() {
    window.open("login.html")
};







