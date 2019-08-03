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
        // Returns a list of game names and directory names for the games in the form of {'game name': directoryname} to a callback function
        // Returns false to the callback function if user hase no saved games in the database

        // Start by grabbing the contents of the directory
        this.database.ref(`owners/${user}`).once('value', function (snapshot) {
            
            // If user has no games saved, then abort the rest of this function and return false
            console.log(snapshot.val())
            if (!snapshot.val()) {
                callBack(false)}
            else {
                //TODO

                // Some example output:
                callBack([{'Example Clue Hunt 003':"-LlOCvAiBcj7ezCteUXz"},{'Example Clue Hunt 002':"-LlOCy-D0C4MBVlhYkF6"}])

            // Else do the rest of the function
        }});
    },

    getClue : function(gameID, clueNumber, callback) {
        // takes the big long random number specifying the directory that data for a game is stored in, 
        // the number (indexed from zero) of the clue desired,
        // and a callback function
        // Queries the database for the specified clue, and returns the clue text to the callback function


        // TODO: Write this

        // Test output:
        callback('Test output: Lorem ipsum, etc, blah, blah.');


    },

    getHint : function(gameID, hintNumber, callback) {
        // takes the big long random number specifying the directory that data for a game is stored in, 
        // the number (indexed from zero) of the clue/hint desired,
        // and a callback function
        // Queries the database for the specified clue, and returns the clue text to the callback function


        // TODO: Write this

        // Test output:
        callback('Test output: Here is the hint your wrote for clue number #');


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


dbi.getGames('TestUser29', function (x) {
    console.log(x)

    });










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