function login() {
  let email = $('#email').val();
  let pass = $('#password').val();

  if (email != undefined && pass != undefined) {
    let jsonData = JSON.stringify({
      'email': email, 'pass': pass
    });
     const url = "https://murmuring-refuge-03345.herokuapp.com/login";

    var client = new XMLHttpRequest();

    client.open("POST", url, false);
    client.setRequestHeader("Content-Type", "application/json");
    client.send(jsonData);

    if (client.status == 200) {

      if (client.responseText === "0") {
        alert("Wrong credentials!");
      } else {
        window.location.replace("http://127.0.0.1:5500/html/Lists.html");
        localStorage.setItem("email", email); 
      }
    } else {
      alert("Error");
    }
  }
  else {
    alert("Wrong input!")
  }
}