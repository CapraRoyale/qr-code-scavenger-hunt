waitForAuth(function () {

    // Attempt to retrieve clue text. If found, display it, if not display 'no clue' message
    dbi.getClue(localStorage.getItem("code"), function (clueText) {

        if (clueText) {
            $("#renderArea").append(clueText);
        } else {
            $("#renderArea").append('<strong>Sorry. No clue with that code could be found.</strong><br>Either the code was entred incorrectly, or the game owner has deleted that clue.');
        }
    });

    // When user clicks claim clue button, check if they are logged in
    // If logged in, update database, if not logged in, send to login.html
    // TODO: Add document.referrer lookup to login page for smart redirects upon successful login
    $('#claim-clue').click(function(event) {
        event.preventDefault();
        if (authentication.uID()) {
            // Update clue folder in database with clues/foundBy/{name: authentication.uName, uID: authentication.uID}
            dbi.claimClue(localStorage.getItem("code"));
        }
        else {
            window.open("login.html", "_self");
        };
    });

});