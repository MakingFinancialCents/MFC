//Init firebase
var config = {
   apiKey: "AIzaSyC8lxrXfJDa71AiWOpk19KHEGtwdB1wpYU",
   authDomain: "makingfinancialcents-9cd22.firebaseapp.com",
   databaseURL: "https://makingfinancialcents-9cd22.firebaseio.com",
   projectId: "makingfinancialcents-9cd22",
   storageBucket: "makingfinancialcents-9cd22.appspot.com",
   messagingSenderId: "23707628473"
 };
  firebase.initializeApp(config);

var database = firebase.database();
var uid="";

$('#logOut').hide();
$('#welcome').hide();


// Event Listener for Feedback button
$('#text1').on("click", function(event) {
  event.preventDefault();
  var textArea = $("#textarea1").val().trim();
  var name = $("#feedbackName").val().trim();
  var info = {
    "message": textArea,
    "name": name
  };
  firebase.database().ref().push(info);
  $("#textarea1").val("");
  $("#feedbackName").val("");
});

// Feedback push to Firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  var textArea = childSnapshot.val().textArea;
  var name = childSnapshot.val().name;
});


const txtEmail = $('#txtEmail');
const txtPassword = $('#txtPassword');
const btnLogin = $('#btnLogin');
const btnSignUp = $('#btnSignUp');
const btnLogOut = $('#btnLogOut');

// Feedback push to Firebase
$("#btnLogin").on('click', e => {
  $('#logIn').hide();
  $('#welcome').show();
  $('#signUp').hide();
  $('#logOut').show();
  const email = $("#txtEmail").val();
  const pass = $('#txtPassword').val();
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  $("#txtEmail").val("");
  $('#txtPassword').val("");
});

//Eventlistener Signup
$('#btnSignUp').on('click', e => {
  $('#logIn').hide();
  $('#welcome').show();
  $('#signUp').hide();
  $('#logOut').show();
  const name = $('#txtName').val();
  const email = $('#txtEmail_SignUp').val();
  const pass = $('#txtPassword_SignUp').val();
  const auth = firebase.auth();
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(e => console.log(e.message));
  $("#txtEmail__SignUp").val("");
  $('#txtPassword__SignUp').val("");
});
var uidSet = function(){
  uid= firebase.auth().currentUser.uid;
};

//Eventlistener logout
$('#btnLogOut').on('click', e => {
  firebase.auth().signOut();
    $('#logIn').show();
    $('#signUp').show();
    $('#welcome').hide();
    $('#logOut').hide();


});

$('#logOut').on('click', e => {
  firebase.auth().signOut();
  $('#logOut').hide();
  $('#logIn').show();
  $('#signUp').show();
  $('#welcome').hide();


});

//Firebase authentication
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    $('#btnLogOut').removeClass('hide');
    $('#btnLogin').addClass('hide');
    $('#logIn').addClass('btnHide');
    $('#logOut').removeClass('btnHide');

  } else {
    console.log('not logged in');
    $('#btnLogOut').addClass('hide');
    $('#btnLogin').removeClass('hide');
    $('#logIn').removeClass('btnHide');
    $('#logOut').addClass('btnHide');


  }
});
