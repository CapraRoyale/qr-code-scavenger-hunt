
// jQuery DOM hooks
const mainDisplayArea = $('#game-display-area');

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
    // Columns are 1) Game Name 2) Edit Button / Print Codes Button 3) Trck
    else {

        // Iterate through list of game objects
        for (let i = 0; i < gameList.length; i++) {

            // Create new html elements
            let newRow = $('<tr>');
            let nameCol = $('<td>').text(gameList[i].name);

            let editCol = $('<button>').text('Edit/Print');
            editCol.addClass('.edit-link');

            let trackCol = $('<button>').text('Track');
            trackCol.addClass('.track-link')

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
        $('.edit-link').click(function () {

            // When button is clicked, add game name to url as argument
            window.location.href = `new_game.html?game=${$(this).attr('game')}`;
        })

        $('.track-link').click(function () {

            // When button is clicked, add game name to url as argument
            window.location.href = `tracking_page.html?game=${$(this).attr('game')}`;
        })

    };
});