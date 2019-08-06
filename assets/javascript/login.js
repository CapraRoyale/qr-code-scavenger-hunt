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

// Assign firebase utilities to variables for easy access
const database = firebase.database();
const auth = firebase.auth();

// jQuery hooks:
const uNameField = $('#inputName');
const uEmailField = $('#inputEmail');
const uPassField = $('#InputPassword1');
const errorDisplay = $('null');

const logInButton = $('#login-button');
const newUserButton = $('#new-account-button');


// Create new account
newUserButton.on("click", function (event) {
    
    // Don't refresh the page (for DEBUG Only)
    event.preventDefault()

    let uName = uNameField.val()
    let uPass = uPassField.val()
    let uEmail = uEmailField.val()

    auth.createUserWithEmailAndPassword(uName, uPass).catch(function(error) {
        switch(error.code) {
            case 'auth/email-already-in-use' :
                errorDisplay.text('That email address already belongs to another user!');
                break;
            case 'auth/invalid-email': 
                errorDisplay.text('Invalid email. Please enter a valid email.');
                break;
        };
    });
});

logInButton.on("click", function (event) {
    
    // Don't refresh the page (for DEBUG Only)
    event.preventDefault()

    let uName = uNameField.val()
    let uPass = uPassField.val()

    auth.signInWithEmailAndPassword(uName, uPass).catch(function(error) {
        console.log(`Failed with error: ${error.code}`);
        console.log(error);
    });
});