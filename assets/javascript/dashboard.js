
// jQuery DOM hooks
const mainDisplayArea = $('#game-display-area');

// As soon as the page loads, we need to ping the database for all games owned by there user
// Will return an array of objects that look like the following: {name: 'game name', id : 'directoryID'}
// Because this is asynchronous, we need to deal with the output as a callback from this function
dbi.getGames(function(gameList){

    // If user has no games, just print a message to that effect and exit the function
    if (gameList === null) {
        mainDisplayArea.html('<tr><td>No saved clue hunts. Go make one!</td></tr>');
        return;
    }

    // If user does have games, iterate through the list of games and add a table row and columns
    // Columns are 1) Game Name 2) Edit Button / Print Codes Button 3) Trck
    else { 

        for (let i = 0; i < gameList.length; i++)

        let newRow = $('<tr>');
        let nameCol = $('<td>').text(gameList[i].name);
        let editCol = $('<button>').text('Edit/Print');
        let trackCol = $('<button>').text('Track')
    };
});