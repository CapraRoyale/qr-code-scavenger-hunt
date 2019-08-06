// dbControll.js already initializes firebase and calls up the database
// so we don't need to do any of that here. 

// Handle for firebase authenticaiton
const auth = firebase.auth();

// jQuery hooks:
const uNameField = $('#inputName');
const uEmailField = $('#inputEmail');
const uPassField = $('#InputPassword1');
const errorName = $('#nameHelp');
const errorEmail = $('#emailHelp');
const errorPassword = $('#passwordHelp');

const logInButton = $('#login-button');
const newUserButton = $('#new-account-button');

function invalidInput(field, response) {
    // Function for handling specific types of invalid input
    switch (field) {
        case 'email':
            uEmailField.addClass('is-invalid');
            errorEmail.addClass('is-invalid');
            errorEmail.text(response);
            break;

        case 'name':
            uNameField.addClass('is-invalid');
            errorName.addClass('is-invalid');
            errorName.text(response);
            break;

        case 'password':
            uPassField.addClass('is-invalid');
            errorPassword.addClass('is-invalid');
            errorPassword.text(response);
            break;

        default:
            throw ('Input Error: "field" argument must be equal to "name", "email", or "password"');
    }
};

// Create new account
newUserButton.on("click", function (event) {

    // Don't refresh the page
    event.preventDefault()

    let uName = uNameField.val()
    let uPass = uPassField.val()
    let uEmail = uEmailField.val()

    auth.createUserWithEmailAndPassword(uEmail, uPass).catch(function (error) {
        console.log(error.message);
        switch (error.code) {
            // Bad email errors
            case 'auth/email-already-in-use':
                invalidInput('email', 'That email address already belongs to another user!');
                break;
            case 'auth/invalid-email':
                invalidInput('email', 'Invalid email. Please enter a valid email.');
                break;
            // TODO: Add more handling 

            // Bad password errors
            // TODO: Add handling

            // For all other errors just print the raw firebase error under the password field
            default:
                invalidInput('password', error.message);
        };
    });
});

logInButton.on("click", function (event) {

    // Error Codes:
    // auth/invalid-email
        // Thrown if the email address is not valid.
    // auth/user-disabled
        // Thrown if the user corresponding to the given email has been disabled.
    // auth/user-not-found
        // Thrown if there is no user corresponding to the given email.
    // auth/wrong-password
        // Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.



    // Don't refresh the page (for DEBUG Only)
    event.preventDefault()

    let uName = uNameField.val()
    let uPass = uPassField.val()

    auth.signInWithEmailAndPassword(uName, uPass).catch(function (error) {
        console.log(`Failed with error: ${error.code}`);
        console.log(error);
        switch(error.code) {
            case 'auth/invalid-email':
                invalidInput('email', 'No user with that email exists.');
                break;
            case 'auth/user-disabled':
                invalidInput(/*TODO*/)
                break;
            case 'auth/user-not-found':
                //TODO
                break;
            case 'auth/wrong-password':
                //TODO
                break;
            default:
                alert('An unknown error occurred. Congradulations!');
            
        }
    });
});

// Authentication State Change Handler 
firebase.auth().onAuthStateChanged(function (user) {

    // If user is logged in, send them to the dashboard
    if (user) {
        window.open("dashboard.html", "_self")
    
    // If for some reason the login state changes, but the user is not logged in
    // blank the input fields so we know something happened, but don't do anything else
    } else {
        console.log('Auth State changed but the user is still not logged in');
        uNameField.val('');
        uEmailField.val('');
        uPassField.val('');
    }
});
