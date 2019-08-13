
// jQuery DOM hooks
const mainDisplayArea = $('#game-display-area');

// If we try to run this file as soon as it loads, we run in to trouble due to firebase authentication taking a non-zero 
// ammount of time to initialize. This would cause our script here to fail when trying to execute, even when it is the 
// last thing loaded on the page. My workaround is to put everything inside of an interval that trys to run every
// half second until it finds that the auth variable has actully been initialized properly.

// Set up a timer that tries to execute the page script every half seconds
// Each time the timer is triggered, it checks to to see if the auth variable is functioning yet
// If it's not, we try again in half a second.
// If it is, we clear out the time and comence execution of the rest of the script

let authCheck = setInterval(() => {

    // Check if the auth variable has been initialized. If it has proceed, otherwise do nothing.
    if (auth) {

        // Remove timer, since we only want any of this to happen once
        clearInterval(authCheck);

        // Double check that user is not logged in. If they are not, send them to the login page.
        if (!authentication.uID()) {window.location.href = "login.html"};

        // As soon as the page loads, we need to ping the database for all games owned by there user
        // Will return an array of objects that look like the following: {name: 'game name', id : 'directoryID'}
        // Because this is asynchronous, we need to deal with the output as a callback from this function
        dbi.getGames((gameList) => {

            // If user has no games, just print a message to that effect and exit the function
            if (gameList === null) {
                mainDisplayArea.html('<tr><td>No saved clue hunts. Go make one!</td></tr>');
                return;
            }

            // If user does have games, iterate through the list of games and add a table row and columns
            // Columns are 1) Game Name 2) Edit Button / Print Codes Button 3) Track
            else {

                // Iterate through list of game objects
                for (let i = 0; i < gameList.length; i++) {

                    // Create new html elements
                    let newRow = $('<tr>');
                    let nameCol = $('<td>').text(gameList[i].name);

                    let editCol = $('<button>').text('Edit/Print');
                    editCol.addClass('edit-link');

                    let trackCol = $('<button>').text('Track');
                    trackCol.addClass('track-link')

                    // Assigin unique game IDs to buttons
                    editCol.attr('game', gameList[i].id)
                    trackCol.attr('game', gameList[i].id)

                    // Attach table cells to table row
                    newRow.append(nameCol);
                    newRow.append('<td>').append(editCol);
                    newRow.append('<td>').append(trackCol);

                    // Attach row to document inside existing 
                    mainDisplayArea.append(newRow);
                }

                // Set up event handlers for buttons
                $(".edit-link").on('click', function () {

                    // When button is clicked, add game name to url as argument
                    window.location.href = `new_game.html?game=${$(this).attr('game')}`;
                })

                $(".track-link").on('click', function () {

                    // When button is clicked, add game name to url as argument
                    window.location.href = `tracking_page.html?game=${$(this).attr('game')}`;
                })

            };
        });
    }

}, 500);