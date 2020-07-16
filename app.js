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
  let database = firebase.database();
  M.AutoInit();

  let count = 2;
  //display count
  // firebase.database().ref().on('value', function (snapshot) {
  //   count = snapshot.val().firstShift
  //   $('#clickValue').html(count);
  // })

  //moment
  moment().format();
  let day = moment().format('MMM Do YYYY');



  const tableHTML = `<table class='highlight centered'>
<thead>
    <tr>
        <th>Date</th>
        <th>Time</th>
        <th>#Availble Shifts</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class='today'></span></td>
        <td class='shift'>10:30-2:30</td>
        <td class='shifts-available'>
        <span id='clickValue'><p></p></span>
        </td>
    </tr>
    <tr>
        <td></td>
        <td class='shift'>2:30-4:30</td>
        <td class='shifts-available'>2</td>
    </tr>
    <tr>
        <td></td>
        <td class='shift'>4:30-6:30</td>
        <td class='shifts-available'>2</td>
    </tr>
    <tr>
        <td></td>
        <td class='shift'>6:30-8:30</td>
        <td class='shifts-available'>2</td>
    </tr>
</tbody>
</table>`


  //clone table and add date
  for (let i = 0; i < 8; i++) {

    function addDate(date) {
      const newDate = moment(day, 'MMM Do YYYY').add(date, 'd').format('MMM Do YYYY');
      $(tableHTML).appendTo('.home');
      $('.today').eq(i).html(newDate);
    }
    addDate(i)
  }

  $('.shifts-available').append(`<a class='waves-effect btn modal-trigger signup1' data-target='modal1'>Sign Up</a>`)
  $("<div class='valign-wrapper'> <a href='./admin.html' class='btn-flat right-align admin-button'>Admin Sign in</a></div>").appendTo('.home');

  //subtract
  // $('.signup1').on('click', function () {
  //   if (count > 0) {
  //     count--
  //     firebase.database().ref().child('shift-count').set({
  //       firstShift: count
  //     })
  //     return count;
  //   } else {
  //     $(this).removeClass('modal-trigger')
  //     M.toast({ html: 'No Availble Shifts' })
  //   }
  // });
  // $('.submit').on('click', function(e){
  //   if ($('#phone').val() === ''){
  //     $(this).removeClass('modal-close')
  //     e.preventDefault();
  //   } 
  //   if ($('#name').val() === ''){
  //     // prevent form from submitting
  //     e.preventDefault();
  //   } 
  //   if ($('#email').val() === ''){
  //     // prevent form from submitting
  //     e.preventDefault();
  //   }
  
  // });

  $('.signup1').on('click', function () {
    let shift = $(this).closest('tr').find('.shift').text();
    let date =  $(this).closest('tbody').eq(0).eq(0).find('.today').text();
    $('.modal').data('shift', shift);
    $('.modal').data('date', date);
  });

//cancel button
$('.cancel').on('click', function(){
  $('#name').val('');
  $('#phone').val('');
  $('#email').val('');
  $('.modal').data('shift','')
  $('.modal').data('date', '')
})


  //add volunteer shift to database

  let name = '';
  let phone = '';
  let email = '';
  let shift = '';
  let date = '';



  $('.submit').on('click', function (e) {
    e.preventDefault();

    name = $('#name').val().trim();
    phone = $('#phone').val().trim();
    email = $('#email').val().trim();
    shift = $('.modal').data('shift').trim();
    date = $('.modal').data('date').trim();

  
    let volunteer = {
      Name: name,
      Phone: phone,
      Email: email,
      Shift: shift,
      Date: date,
    };


    database.ref().push(volunteer)
    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('.modal').data('shift','')
    $('.modal').data('date', '')

  })

// database.ref().on("child_added",function(childSnapshot, preChildKey){
// let orderBy = childSnapshot.val().Date
// parseInt(orderBy)
// console.log(orderBy)
// })


  //add to table
database.ref().orderByChild('Date').on("child_added", function(childSnapshot, prevChildKey){
  $('.volunteer-roster').append(`<tr><td class"target-date">${childSnapshot.val().Date}</td><td>${childSnapshot.val().Shift}</td><td>${childSnapshot.val().Name}</td><td>${childSnapshot.val().Phone}</td><td>${childSnapshot.val().Email}</td></tr>`)
 })


  
  var validate = new Bouncer('form',{
    patterns: {
      email: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
      phone: /[-+]?[0-9]*[.,]?[0-9]+/,
    }
  });

  document.addEventListener('bouncerFormInvalid', function (event) {
    $('.submit').removeClass('modal-close'); 
        M.toast({ html: 'Sign Up Unsuccessful. Try Again' });
        event.preventDefault();
  }, false);



  // document.addEventListener('bouncerFormValid', function (event) {

  //   // The successfully validated form
  //   let form = event.target;
      
  //   if(bouncerFormValid){
  //     M.toast({ html: 'Sign Up Successful' });
  //    } else {
  //     $('.submit').removeClass('modal-close') 
  //     M.toast({ html: 'Sign Up Unsuccessful. Try Again' })
  //    }
  
  //   // If `disableSubmit` is true, you might use this to submit the form with Ajax
  
  // }, false);
  
});