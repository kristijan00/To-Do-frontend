/* 
1. show / hide button 
---------------------
*/
// create variables
const toggleBtn = document.querySelector('#toggleBtn');
const divList = document.querySelector('.listHolder');
const logOutBtn = document.querySelector('#logOutBtn');

logOutBtn.addEventListener('click', () => {
  signOut();
});

// check if the user is logged in
window.onload = function () {
  const url = "https://murmuring-refuge-03345.herokuapp.com/home";
  // const url = "http://localhost:3000/home";

  var client = new XMLHttpRequest();

  client.open("POST", url, false);
  client.setRequestHeader("Content-Type", "application/json");
  client.send();

  if (client.status == 200) {

    if (client.responseText === "0") {
      // alert("Wrong credentials!");
    } else {
      alert("Logged in: " + client.responseText);
      logOutBtn.style.display = 'block';
    }

  }
};

//sign out the user from the current session
function signOut() {
  const url = "https://murmuring-refuge-03345.herokuapp.com/logout";
  // const url = "http://localhost:3000/logout";

  var client = new XMLHttpRequest();

  client.open("POST", url, false);
  client.setRequestHeader("Content-Type", "application/json");
  client.send();

  if (client.status == 200) {

    if (client.responseText === "0") {
      alert("You're not logged in");
    } else {
      alert("Logged out!");
      logOutBtn.style.display = 'none';
      window.location.replace("http://127.0.0.1:5500/html/login.html");
    }
  }
};

// action to be taken when clicked on hide list button
toggleBtn.addEventListener('click', () => {
  if (divList.style.display === 'none') {
    divList.style.display = 'block';
    toggleBtn.innerHTML = 'Hide List';
  } else {
    divList.style.display = 'none';
    toggleBtn.innerHTML = 'Show List';
  }
});

/* 
2. add list items
-----------------
*/
// create variables
const addInput = document.querySelector('#addInput');
const addBtn = document.querySelector('#addBtn');


function addLists() {
  if (addInput.value === '') {

    alert('Enter text!!!');

  } else {
    const ul = divList.querySelector('ul');
    const li = document.createElement('li');
    //li.innerHTML = addInput.value;
    let title = addInput.value;
    console.log(title)


    let jsonData = JSON.stringify({
      'title': title
    });

    const url = "http://localhost:3000/saveNote";

    var client = new XMLHttpRequest();

    client.open("POST", url, false);
    client.setRequestHeader("Content-Type", "application/json");
    client.send(jsonData);

    if (client.status == 200) {
      // alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText)
      li.innerHTML = title;
      ul.appendChild(li);
      createBtn(li);

    }

  }
}



// add list when clicked on add item button
addBtn.addEventListener('click', () => {
  addLists();
});

// add list when pressed enter
addInput.addEventListener('keyup', (event) => {
  if (event.which === 13) {
    addLists();
  }
});
/* 
3. create action buttons
------------------------
*/
// create variables
const listUl = document.querySelector('.list');
const lis = listUl.children;

function createBtn(li) {
  // create remove button
  const remove = document.createElement('button');
  remove.className = 'btn-icon remove';
  li.appendChild(remove);

  /* create down button
  const down = document.createElement('button');
  down.className = 'btn-icon down';
  li.appendChild(down);

  // create up button
  const up = document.createElement('button');
  up.className = 'btn-icon up';
  li.appendChild(up);*/

  return li;
}

// loop to add buttons in each li
for (var i = 0; i < lis.length; i++) {
  createBtn(lis[i]);
}


/* 
4. enabling button actions (to move item up, down or delete)
------------------------------------------------------------
*/
divList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const button = event.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    if (button.className === 'btn-icon remove') {
      ul.removeChild(li);
    } /*else if (button.className === 'btn-icon down') {
      const nextLi = li.nextElementSibling;
      if (nextLi) {
        ul.insertBefore(nextLi, li);
      }
    } else if (button.className === 'btn-icon up') {
      const prevLi = li.previousElementSibling;
      if (prevLi) {
        ul.insertBefore(li, prevLi);
      }
    }*/
  }
});

