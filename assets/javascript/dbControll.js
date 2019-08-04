// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBrRR7AaTFxH1M2UpCLdFJErlKayHh3Vkw",
    authDomain: "qr-code-hunt-for-red-october.firebaseapp.com",
    databaseURL: "https://qr-code-hunt-for-red-october.firebaseio.com",
    projectId: "qr-code-hunt-for-red-october",
    storageBucket: "qr-code-hunt-for-red-october.appspot.com",
    messagingSenderId: "912354708461",
    appId: "1:912354708461:web:cf9e153278af2886"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const dbi = {
    database : firebase.database(),

    saveNewGame : function (gameName, gameOwner, clueList, hintList) {
        // Method that creates a new directory in the database, which will hold all the info we need about our game
        // Also adds an entry to the 'owners' directory under the current owner name so that this direcotry can be found later
        // If a callback is specified then it is activated when final operation is complete.


        // Create new directory in database containing the name of the game under 'gameName'
        // Save name of new directory to variable gameID (use gameID.key for actual directory name)
        gameID = this.database.ref().push({ 'gameName': gameName });

        // Add username of the creator of this particular game to the directory under 'owner'
        this.database.ref(`${gameID.key}/owner`).set(gameOwner);

        // Add list of clues to directory under directory/'clues'/cluenumber (indexed from zero)
        // Iterate through list of clues
        for (let i = 0; i < clueList.length; i++) {
            // Construct unique path using current game directory and current list index
            let path = `${gameID.key}/clues/${i}`;
            // Add text of clue using constructed path
            this.database.ref(path).set(clueList[i]);
        };

        // Add list of clue hints to directory under directory/'hints'/cluenumber (indexed from zero)
        // Same as above
        for (let i = 0; i < hintList.length; i++) {
            let path = `${gameID.key}/hints/${i}`;
            this.database.ref(path).set(hintList[i]);
        };

        // Add entry to 'owners' directory for this owner owning this game directory
        this.database.ref(`owners/${gameOwner}/`).push(gameID.key);

    },

    getGames : function (user, callBack) {
        // Queries the database for games owned by the specified user
        // Returns a list of game names and directory names for the games in the form of {name: 'game name', id : 'directoryname'} to a callback function
        // Returns null to the callback function if user hase no saved games in the database

        // Start by grabbing the contents of the directory
        // Note that because we will need to use this.database again with this function,
        // we need to setup our callback using arrow notation so that the 'this' keyword retains the same value inside the 
        // callback function despite that callback being invoked elsewhere
        this.database.ref(`owners/${user}`).once('value', (snapshot) => {
            
            // If user has no games saved, then abort the rest of this function and return null
            if (!snapshot.val()) {
                callBack(null)}
            
            // If, however, the user does have at least one saved game, we can get into the actual meat of this function
            else {
                
                // For storing our output
                let userGames = []; 

                // Generates a list of the database locations for every user game
                let gameIDs = Object.values(snapshot.val())

                // Iterate through database locations to grab the user set name for each game
                for (let i = 0; i < gameIDs.length; i++) {

                    // For each element in userGames, we use that element as the value for a database lookup
                    this.database.ref(gameIDs[i]).once('value', function (snapshot) {

                        // Then we construct an object with our two values, before pushing it to our userGames list
                        userGames.push({name: snapshot.val().gameName, id: gameIDs[i]});

                        // Because these operations are preformed asynchronously we can't expect to have all our values in userGames when the for loop finishes
                        // likewise, we can't even be sure that we'll get all the info back in the same order we asked for it
                        // So, instead of returning userGames to the callback function when 'finished', we'll do it at the end of whichever callback
                        // has added the final value to the list. We can determin this easily by comparing our list length to the length of the gameIDs list.
                        if (userGames.length === gameIDs.length) {callBack(userGames)};
                    })};
        }});
    },

    getClue : function(gameID, clueNumber, callback) {
        // takes the big long random number specifying the directory that data for a game is stored in, 
        // the number (indexed from zero) of the clue desired,
        // and a callback function
        // Queries the database for the specified clue, and returns the clue text to the callback function

        // Basically we just plug our arguments into a path and that leads straight to our clue text. 
        // Then we just call .val() on our snapshot and pass that to the callback
        this.database.ref(`${gameID}/clues/${clueNumber}`).once('value', (snapshot) => {
            callback(snapshot.val())
        });

    },

    getHint : function(gameID, hintNumber, callback) {
        // takes the big long random number specifying the directory that data for a game is stored in, 
        // the number (indexed from zero) of the clue/hint desired,
        // and a callback function
        // Queries the database for the specified clue, and returns the clue text to the callback function


        // Basically we just plug our arguments into a path and that leads straight to our clue text. 
        // Then we just call .val() on our snapshot and pass that to the callback
        this.database.ref(`${gameID}/hints/${hintNumber}`).once('value', (snapshot) => {
            callback(snapshot.val())
        });


    },

    executeTest : function () {
        // Test/example values -- This won't be included in the final version, but is useful for testing.
        let gameName = 'Example Clue Hunt 002';
        let owner = 'TestUser19';
        let clues = ['Under the stairs', 'In the \'cookie jar\'', 'Where you lay your head', 'Your most private location', 'Atop the clock tower'];
        let hints = ['000', '111','222','333','444'];

        // Create new code hunt game:
        dbi.saveNewGame(gameName, owner, clues, hints);
    },
}

// // For testing: 
// let aGame;
// dbi.getGames('TestUser19', function (x) {
//     console.log(x)
//     aGame = x[0].id;
//     console.log(aGame)
//     dbi.getClue(aGame, 1, (val) => {console.log('Clue: ' + val)})
//     dbi.getHint(aGame, 1, (val) => {console.log('Hint: ' + val)})
//     });










// // Testing testing testing....

// // Test/example values
// let gameName = 'Example Clue Hunt';
// let gameID;
// let clues = ['Under the stairs', 'In the \'cookie jar\'', 'Where you lay your head', 'Your most private location', 'Atop the clock tower']

// // Create new code hunt game:
// gameID = database.ref().push({ 'gameName': gameName });
// for (let i = 0; i < clues.length; i++) {
//     console.log('Adding next clue...')
//     console.log(gameID)
//     let path = `${gameID.key}/${i}`;
//     database.ref(path).set(clues[i]);
// };