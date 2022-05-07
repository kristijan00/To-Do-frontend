/* 
1. show / hide button 
---------------------
*/
// create variables
const toggleBtn = document.querySelector('#toggleBtn');
const divList = document.querySelector('.listHolder');
const listUl = document.querySelector('.list');
const lis = listUl.children;
var map = new Map()
const logOutBtn = document.querySelector('#logOutBtn');
var email; 

logOutBtn.addEventListener('click', () => {
  signOut();
});

// check if the user is logged in
window.onload = function () {
   //const url = "https://murmuring-refuge-03345.herokuapp.com/login";
  //const url = "https://murmuring-refuge-03345.herokuapp.com/home";
  //const url = "http://127.0.0.1:3000/login"; 

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


viewList(); 
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

    email = localStorage.getItem("email"); 

    console.log(email); 
    let jsonData = JSON.stringify({
      'title': title, 'email': email
    });

   
     const url = "https://murmuring-refuge-03345.herokuapp.com/saveNote";
    // const url = "http://127.0.0.1:3000/saveNote"; 
     var client = new XMLHttpRequest();
     
     client.open("POST", url, false);
     client.setRequestHeader("Content-Type", "application/json");
     client.send(jsonData);
     
      if (client.status == 200){
        // alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText)
        li.innerHTML = title;
        ul.appendChild(li);
        createBtn(li);
      $("#addInput").val("");
      window.location.reload();

      
       }

  }
}
function viewList() {
  email = localStorage.getItem("email"); 
  console.log(localStorage.getItem("email")); 

  const url = "https://murmuring-refuge-03345.herokuapp.com/notebyEmail";
// const url = "http://127.0.0.1:3000/notebyEmail";

  let jsonData = JSON.stringify({
    'email': email
  });

     var client = new XMLHttpRequest();
     
     client.open("POST", url, false);
     client.setRequestHeader("Content-Type", "application/json");
     client.send(jsonData);
      if (client.status == 200){
        // alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText)
        let notes = JSON.parse(client.response);
        var allNotes = notes.results.map(d => d.title);
        var getTheId = notes.results.map(d => d.noteid);
        console.log(allNotes); 
        for (let index = 0; index < allNotes.length; index++) {
          const ul = divList.querySelector('ul');
          const li = document.createElement('li');
          const noteId = getTheId[index];
          const getNotes = allNotes[index]
          li.innerHTML = getNotes; 
          li.setAttribute("id", noteId); 
          ul.appendChild(li);
          saveNoteId(li, noteId); 
          map.set(noteId, li)
          console.log("Note " + allNotes[index] + ": ID: " + getTheId[index]); 
        }
     
  }
     
     
}

function deleteList() {
  
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

function createBtn(li) {
  // create remove button
  const remove = document.createElement('button');
  remove.className = 'btn-icon remove';
  li.appendChild(remove);
  return li;
}

function saveNoteId (li, noteId) { 
  const id = document.createElement('Label');
  id.className = 'getId';
//$('.getId').attr("hidden", false);
 id.id = noteId; 
 li.appendChild(id); 
 return li; 
 }

 


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
      var id = $(li).attr("id"); 
      let jsonData = JSON.stringify({
        'id': id,
      });
       const url = "https://murmuring-refuge-03345.herokuapp.com/delete";
      // const url = "http://127.0.0.1:3000/delete";
       

       var client = new XMLHttpRequest();
       
       client.open("POST", url, false);
       client.setRequestHeader("Content-Type", "application/json");
       client.send(jsonData);

        if (client.status == 200){
          // alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText)
           if(client.response==1){
            ul.removeChild(li);
            console.log("Deleted"); 

           
    }
        }
       
    } 
  }
});