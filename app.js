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
  const database = firebase.database();
  const auth = firebase.auth();
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
  $(`<div class='valign-wrapper'> <a class='btn-flat right-align admin-button modal-trigger' data-target='modal2' id='sign-in-modal'>Admin Sign in</a></div>`).appendTo('.home');
  $(`<div class='valign-wrapper'><a href="./admin.html" class='btn-flat hide' id='roster'>View Roster</a><a href="#!" class="waves-effect btn-flat hide" id='btn-logout'>Sign Out</a></div>`).appendTo('.home');
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


  $('.signup1').on('click', function () {
    let shift = $(this).closest('tr').find('.shift').text();
    let date = $(this).closest('tbody').eq(0).eq(0).find('.today').text();
    $('.modal').data('shift', shift);
    $('.modal').data('date', date);
  });

  //cancel button
  $('.cancel').on('click', function () {
    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('.modal').data('shift', '')
    $('.modal').data('date', '')
  })


  //add volunteer shift to database

  let name = '';
  let phone = '';
  let email = '';
  let shift = '';
  let date = '';


  //add to table
  database.ref().child('/volunteers').orderByChild('Date').on("child_added", function (childSnapshot, prevChildKey) {
    $('.volunteer-roster').append(`<tr><td class"target-date">${childSnapshot.val().Date}</td><td>${childSnapshot.val().Shift}</td><td>${childSnapshot.val().Name}</td><td>${childSnapshot.val().Phone}</td><td>${childSnapshot.val().Email}</td></tr>`)
  })
  



  // database.ref().child('/volunteers').on("child_added", function (childSnapshot, prevChildKey) {

// let reference = database.ref.child('/volunteers')

// database.ref().child('/volunteers').orderByChild("Date").equalTo("Date" < day)
// .once('value').then(function(snapshot){
//     snapshot.forEach(childSnapshot){
//       ref.child(childSnapshot.key.remove())
//     });
//   });

      // if (childSnapshot.val().Date < day) {
      //     console.log(childSnapshot.val().Date)
      // }

  
// });

        // database.ref().child(key).update(null);
     


$('.submit').on('click', function (e) {
  let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
  let emailRegex = /^\S+@\S+\.\S+$/

  name = $('#name').val().trim();
  phone = $('#phone').val().trim();
  email = $('#email').val().trim();
  shift = $('.modal').data('shift').trim();
  date = $('.modal').data('date').trim();

  if ($('#phone').val() === '' || $('#name').val() === '' || $('#email').val() === '') {
    e.preventDefault();
  } else if (!phoneRegex.test(phone)) {
    
    e.preventDefault()
  } else if (!emailRegex.test(email)) {
    e.preventDefault()
  } else {

    let volunteer = {
      Name: name,
      Phone: phone,
      Email: email,
      Shift: shift,
      Date: date,
    };


    database.ref().child('volunteers').push(volunteer)

    $('#name').val('');
    $('#phone').val('');
    $('#email').val('');
    $('.modal').data('shift', '')
    $('.modal').data('date', '')

    $('.submit').addClass('modal-close')
  }
})
var validate = new Bouncer('form', {
  patterns: {
    email: /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/,
    tel: /[-+]?[0-9]*[.,]?[0-9]+/,
  }
});

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
  promise.catch(e => console.log(e.message))
})


firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {

    btnLogOut.classList.remove('hide');
    btnRoster.classList.remove('hide')
    btnModal.classList.add('hide')
  } else {

    btnLogOut.classList.add('hide');
    btnRoster.classList.add('hide')
    btnModal.classList.remove('hide')
    console.log('not logged in')
  }
})

btnLogOut.addEventListener('click', e => {
  firebase.auth().signOut();
})


});
