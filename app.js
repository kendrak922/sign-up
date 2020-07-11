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
      $(tableHTML).appendTo('.container');
      $('.today').eq(i).html(newDate);
    }
    addDate(i)
  }

  $('.shifts-available').append(`<a class='waves-effect btn modal-trigger signup1' data-target='modal1'>Sign Up</a>`)
  $(' <button class="btn-flat admin-button">Admin Sign in</button>').appendTo('.container');

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
    console.log(date)
    console.log(shift)
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
    console.log(volunteer)
    database.ref().child('volunteers').push(volunteer)
 

    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('.modal').data('shift','')
    $('.modal').data('date', '')

  })
  

});