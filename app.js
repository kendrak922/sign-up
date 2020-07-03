'use strict';
$(document).ready(function () {


  var firebaseConfig = {
    apiKey: "AIzaSyAj_PWrOTX-ywI3RTU4kFQzX2Nrw7_OEvI",
    authDomain: "volunteer-dev-3ced0.firebaseapp.com",
    databaseURL: "https://volunteer-dev-3ced0.firebaseio.com/",
    projectId: "volunteer-dev-3ced0",
    storageBucket: "volunteer-dev-3ced0.appspot.com",
    messagingSenderId: "607646295816",
    appId: "1:607646295816:web:8c546b0a17b4110c992ebd",
    measurementId: "G-EXFJJDYCW1"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
  let count = 2;
  //display count
  firebase.database().ref().on("value", function (snapshot) {
    count = snapshot.val().firstShift
    $('#clickValue').html(count);
  })
  //subtract
    $("#signup1").on('click', function () {
      if(count > 0){
      count--
      firebase.database().ref().set({
        firstShift: count
      })
      return count;
    }else{
     alert('No Available Shifts');
    }
        });

//moment
moment().format();

const day = moment().format('MMMM Do YYYY');
$("#today").html(day);

//materialize
$('.modal').modal();
$('#modal1').modal('open');


});