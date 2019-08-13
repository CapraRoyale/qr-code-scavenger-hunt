// dbControll.js already initializes firebase and calls up the database
// so we don't need to do any of that here. 

// jQuery hooks:
const uNameField = $('#inputName');
const uEmailField = $('#inputEmail');
const uPassField = $('#inputPassword');
const errorName = $('#nameHelp');
const errorEmail = $('#emailHelp');
const errorPassword = $('#passwordHelp');

uNameForm = $('.nameForm')

const logInButton = $('.loginBtn');
const newUserButton = $('.newAccount');

// Username for new accounts must be global so it can be grabbed by the signin event listener.
let uName;

function invalidInput(field, response='Invalid input!') {
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

        case 'reset':
            uPassField.removeClass('is-invalid');
            uNameField.removeClass('is-invalid');
            uEmailField.removeClass('is-invalid');
            break;

        default:
            throw ('Input Error: "field" argument must be equal to "name", "email", or "password"');
    }
};

// Create new account
newUserButton.on("click", function (event) {

    // Don't refresh the page
    event.preventDefault()

    // Reset any invalid input styles to default first 
    invalidInput('reset');

    // Only do the following if the name field has already been revealed
    if (uNameForm.css('display') !== 'none') {

        // Grab user inputted values from DOM
        uName = uNameField.val().trim();
        let uPass = uPassField.val();
        let uEmail = uEmailField.val();

        // Check for valid user name
        if (uName === '') {
            invalidInput('name', 'Please enter a user name for your account.');
            return;
        }
        else if (uName.length < 2) {
            invalidInput('name', 'Name too short. Must have at least 2 characters.');
            return;
        }

        // Attempt to create new user account
        auth.createUserWithEmailAndPassword(uEmail, uPass).then(function (response) {

            // Grab user object from response
            let user = response.user 

            // Add user name to account under 'displayName' property 
                user.updateProfile({
                    displayName: uName
                }).then(function(){
                    // On success 
                    console.log('Successfully created new account!')

                }).catch(function(error){
                    console.log('Database Error: Could not attach displayName to user account due to the following error:');
                    throw(error);
                });

        }).catch(function (error) {
            console.log(`Server rejected request with error message: '${error.message}'`);
            switch (error.code) {
                // Bad email errors
                case 'auth/email-already-in-use':
                    invalidInput('email', 'That email address already belongs to another user!');
                    break;
                case 'auth/invalid-email':
                    invalidInput('email', 'Please enter a valid email.');
                    break;
                // TODO: Add more handling 

                // Bad password errors
                // TODO: Add handling

                // For all other errors just print the raw firebase error under the password field
                default:
                    invalidInput('password', error.message);
            };

            return;

        });

    }

    // If name field was not displayed, instead reveal it and do nothing else.
    else {
        uNameForm.css('display', 'block');
    };

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

    // Grab user inputted values from DOM
    let uEmail = uEmailField.val();
    let uPass = uPassField.val();

    // Create new user with firebase and handle any errors
    auth.signInWithEmailAndPassword(uEmail, uPass).catch(function (error) {
        console.log(`Login failed with error: ${error.code}`);

        switch (error.code) {
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
auth.onAuthStateChanged(function (user) {

    // If user is logged in, send them to the dashboard
    if (user) {
        window.open("dashboard.html", "_self");

        // If for some reason the login state changes, but the user is not logged in
        // blank the input fields so we know something happened, but don't do anything else
    } else {

        uNameField.val('');
        uEmailField.val('');
        uPassField.val('');
    }
});
