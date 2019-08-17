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

// Handle for firebase authenticaiton
const auth = firebase.auth();

const authentication = {

    failedLogoutCounter: 0,
    loginElement: $('.login_logout'), //TODO: Add jquery hook to login/logout element from NavBar

    // Get user's unique firebase user ID
    // if no user is signed in, this function returns null
    uID: function () {
        if (!auth.currentUser) { return null }
        else { return auth.currentUser.uid };
    },

    // Get user's display name
    // if no user is signed in, this function returns null
    // if the user is signed in, but this function still returns null, then we made a mistake during account creation
    uName: function () {
        if (!auth.currentUser) { return null }
        else { return auth.currentUser.displayName };
    },

    // Logout current user
    // Attempts to log out the current user. If attempt fails, it sets an interval to try again every few seconds
    logout: function () {

        // On success, refresh page
        auth.signOut().then(function () {
            location.reload();

            // On failure,
        }).catch(function (error) {

            // Print error to console as warning:
            console.warn(`Logout failed with the following error:`);
            console.warn(error);

            // Try again every 3 seconds until it works unless we've already tried 10 times,
            // then just tell the user to refresh and try again.

            if (failedLogoutCounter > 9) {
                alert("The system is unable to log you at this time, please refresh the page and try again!");
            };

            setTimeout(function () {

                failedLogoutCounter++;

                authentication.logout();
            }, 3000);

        });
    },


    // Whenever auth-state changes, make sure the correct login/logout link is displayed on the nav-bar
    setNavbarStatus: function () {

        // Authentication State Change Handler
        auth.onAuthStateChanged(function (user) {

            // If user is logged in, chage button to 'logout'
            if (user) {

                // Remove existing click handlers
                authentication.loginElement.off()

                // Change text
                authentication.loginElement.text('Logout');

                // Add new click handler which just calls the log out function
                authentication.loginElement.click(function () {
                    authentication.logout();
                    location.reload(); 

                });

                // If user is logged out, change button to 'login'
            } else {
                // Remove existing click handlers
                authentication.loginElement.off()

                // Change text
                authentication.loginElement.text('Login');

                // Add new click handler which sends the user to the login page
                authentication.loginElement.click(function () {
                    window.location.href = "login.html";
                });

            }
        });
    }
};

// Use this function to make sure that authentication is up and running before tyring to do anything.
// This should hopefully prevent errors due to auth not being loaded.
// Put your entire code inside of the callback argument as an anonymous function (just like with onClick events)
// I wish this wasn't so hackey, but hey, here we are and it effin' works
function waitForAuth(callback) {
    auth.onAuthStateChanged(callback);

};

authentication.setNavbarStatus();
