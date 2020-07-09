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
  M.AutoInit();
  let count = 2;
  //display count
  firebase.database().ref().on("value", function (snapshot) {
    count = snapshot.val().firstShift
    $('#clickValue').html(count);
  })

  //moment
  moment().format();
  let day = moment().format('MMM Do YYYY');
  // $("#today").html(day)
  const tableHTML = `<table class="highlight centered">
<thead>
    <tr>
        <th>Date</th>
        <th>Time</th>
        <th>#Availble Shifts</th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class="today"></span></td>
        <td class="shift">10:30-2:30</td>
        <td class='shifts-available'>
        <span id="clickValue"><p></p></span>
        </td>
    </tr>
    <tr>
        <td></td>
        <td class="shift">2:30-4:30</td>
        <td class='shifts-available'>2</td>
    </tr>
    <tr>
        <td></td>
        <td class="shift">4:30-6:30</td>
        <td class='shifts-available'>2</td>
    </tr>
    <tr>
        <td></td>
        <td class="shift">6:30-8:30</td>
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

  $('.shifts-available').append(`<a class="waves-effect btn modal-trigger signup1" data-target="modal1">Sign Up</a>`)


  //subtract
  $(".signup1").on('click', function () {
    if (count > 0) {
      count--
      firebase.database().ref().set({
        firstShift: count
      })
      return count;
    } else {
      $(this).removeClass('modal-trigger')
      M.toast({ html: 'No Availble Shifts' })
    }
  });

  $(".signup1").on('click',function () {
    let shift = $(this).closest('tr').find('.shift').text()
    $('.modal').data("shift", shift)
    console.log(shift)
  });


  //add volunteer shift to database

  let database = firebase.database();

  let name = '';
  let phone = '';
  let email = '';
  let shift = '';
 


$(".submit").on('click', function (event,) {
  event.preventDefault();

  name = $("#name").val().trim();
  phone = $("#phone").val().trim();
  email = $("#email").val().trim();
  shift = $('.modal').data("shift").trim();

  


  let volunteer = {
    Name: name,
    Phone: phone,
    Email: email,
    Shift: shift,
  };
console.log(volunteer)
  database.ref().child("volunteers").push(volunteer)

  $('#name').val('');
  $('#phone').val('');
  $('#email').val('');
  $('.modal').data('shift', '')

})

});