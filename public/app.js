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
  }
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const auth = firebase.auth();
  M.AutoInit();
  

  const tableHTML = `<table class='highlight centered'>
<thead>
    <tr>
        <th>Date</th>
        <th>Time</th>
        <th></th>
    </tr>
</thead>
<tbody>
    <tr>
        <td><span class='today'></span></td>
        <td class='shift' shift=1>10:30am - 12:30pm</td>
        <td class='shifts-available'>
        </td>
    </tr>
    <tr>
        <td></td>
        <td class='shift' shift=2>12:30pm - 2:30pm</td>
        <td class='shifts-available'></td>
    </tr>
    <tr>
        <td></td>
        <td class='shift' shift=3>2:30am - 4:30pm</td>
        <td class='shifts-available'></td>
    </tr>
    <tr>
        <td></td>
        <td class='shift' shift=4>4:30am - 6:30pm</td>
        <td class='shifts-available'></td>
    </tr>
</tbody>
</table>`



  //clone table and add date
  for (let i = 0; i < 8; ++i) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    // Increment current date by day * i
    const newDate = new Date(Date.now() + (1000 * 60 * 60 * 24 * i));
    const d = newDate.getDate()
    const y = newDate.getFullYear()
    const monthIndex = newDate.getMonth()
    const monthName = months[monthIndex]
    const formatted = `${monthName} ${d}, ${y}`
    $(tableHTML).appendTo('.home');
    $('.today').eq(i).html(formatted);
  }

  $('.shifts-available').append(`<a class='waves-effect btn modal-trigger signup1' data-target='modal1'>Sign Up</a>`)
  $(`<div class='valign-wrapper'> <a class='waves-effect waves-light btn-small right-align admin-button modal-trigger' data-target='modal2' id='sign-in-modal'>Admin Login</a></div>`).appendTo('.home');
  $(`<div class='valign-wrapper'><a href="./admin.html" class='waves-light btn-small hide' id='roster'>View Roster</a><a href="#!" class="waves-effect waves-light btn-small hide" id='btn-logout'>Log Out</a></div>`).appendTo('.home');


  $('.signup1').on('click', function () {
    let shift = parseInt($(this).closest('tr').find('.shift').attr("shift"));
    let date = $(this).closest('tbody').eq(0).eq(0).find('.today').text();
    let dateFormat = Date.parse(date)
    $('.modal').data('shift', shift);
    $('.modal').data('date', dateFormat);
  });

  //cancel button
  $('.cancel').on('click', function () {
    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('.modal').data('shift', '')
    $('.modal').data('date', '')
    $('#name-error').remove()
    $('#phone-error').remove()
    $('#email-error').remove()
    $('input').removeClass('valid')
    $('input').removeClass('invalid')
  })


  //add volunteer shift to database
  let name = '';
  let phone = '';
  let email = '';
  let shift = '';
  let date = '';
  let sortOrder = '';


  const today = Date.now() - (1000 * 60 * 60 * 24);

  //add to table
  database.ref().child('/volunteers').orderByChild('sortOrder').startAt(today).on("child_added", function (childSnapshot, prevChildKey) {
    let date = childSnapshot.val().Date
    let formatted = (new Date(date)).toDateString()
    let shiftNew = childSnapshot.val().Shift
    function formatShift(shiftNew) {
      if (shiftNew == 1) {
        return shiftNew = "10:30am - 12:30pm"
      } else if (shiftNew == 2) {
        return shiftNew = "12:30pm - 2:30pm "
      } else if (shiftNew == 3) {
        return shiftNew = "2:30pm - 4:30pm"
      } else {
        return shiftNew = "4:30pm - 6:30pm"
      }
    }
    let formattedShift = formatShift(shiftNew)

    $('#volunteer-roster').append(`<tr class="item"><td class="target-date">${formatted}</td><td>${formattedShift}</td><td>${childSnapshot.val().Name}</td><td>${childSnapshot.val().Phone}</td><td>${childSnapshot.val().Email}</td></tr>`)
  })

  ////form validation
  // $.validator.setDefaults({
  //   errorClass: 'invalid',
  //   validClass: "valid",
  //   errorPlacement: function(error, element) {
  //     $(element)
  //       .closest("form")
  //       .find("label[for='" + element.attr("id") + "']")
  //       .attr('data-error', error.text());
  //   },
  // });


let form = $('#form')
const validator = $(".form").each(function(){
  $(this).validate({
    rules: {
      name: "required",
      password: "required",
      phone: {
        required: true,
        phoneUS: true
      },
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: "Please specify your name",
      email: {
        required: "We need your email address",
        email: "Your email address must be in the format of name@domain.com",
      },
      phone: {
        required: "We need your phone number",
        phone: "Please enter a valid phone number",
      }
    },
    errorElement: 'div',
errorPlacement: function (error, element) {
    var placement = $(element).data('error');
    if (placement) {
        $(placement).append(error)
    } else {
        error.insertAfter(element);
    }
}
  });
});

  $('.submit').on('click', function (e) {
    name = $('#name').val().trim();
    phone = $('#phone').val().trim();
    email = $('#email').val().trim();
    shift = $('.modal').data('shift')
    date = $('.modal').data('date')

    if (form.valid()) {
      let volunteer = {
        Name: name,
        Phone: phone,
        Email: email,
        Shift: shift,
        Date: date,
        sortOrder: date + shift,
      };

      database.ref().child('volunteers').push(volunteer)

      $('#name').val('');
      $('#phone').val('');
      $('#email').val('');
      $('.modal').data('shift', '');
      $('.modal').data('date', '');

      $('.submit').addClass('modal-close');
      $('input').removeClass('valid');
      M.toast({html: "You're signed up!"})
    }
  })
  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    // onOpenEnd: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
    // },
    onCloseEnd: function() { // Callback for Modal close
      $('#name').val('');
      $('#phone').val('');
      $('#email').val('');
      $('#txtEmail').val('')
      $('#txtPassword').val('')
      $('.modal').data('shift', '');
      $('.modal').data('date', '');
      $('input').removeClass('valid');
      $('input').removeClass('invalid');
    } 
  }
);

  ///authorization
  const btnLogin = document.getElementById('adminSubmit');
  const btnLogOut = document.getElementById('btn-logout');
  const btnRoster = document.getElementById('roster')
  const btnModal = document.getElementById('sign-in-modal')


  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => M.toast({html: "Email or Password Incorrect"}))
  })


  firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      $('#adminSubmit').addClass('modal-close');
      btnLogOut.classList.remove('hide');
      btnRoster.classList.remove('hide')
      btnModal.classList.add('hide')
    } else {
      btnLogOut.classList.add('hide');
      btnRoster.classList.add('hide')
      btnModal.classList.remove('hide')
    }
  })

  btnLogOut.addEventListener('click', e => {
    firebase.auth().signOut();
  })


});