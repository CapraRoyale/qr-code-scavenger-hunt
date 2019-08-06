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

    // Don't refresh the page (for DEBUG Only)
    event.preventDefault()

    let uName = uNameField.val()
    let uPass = uPassField.val()

    auth.signInWithEmailAndPassword(uName, uPass).catch(function (error) {
        console.log(`Failed with error: ${error.code}`);
        console.log(error);
    });
});

// Authentication State Change Handler 

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.open("clue_page.html", "_self")
    } else {
        uNameField.val('');
        uEmailField.val('');
        uPassField.val('');
    }
});
