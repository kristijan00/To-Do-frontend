function login() {
  let email = $('#email').val();
  let pass = $('#password').val();

  if (email != undefined && pass != undefined) {
    let jsonData = JSON.stringify({
      'email': email, 'password': password
    });
    // const url = "https://murmuring-refuge-03345.herokuapp.com/login";
    const url = "http://localhost:3000/login";

    var client = new XMLHttpRequest();

    client.open("POST", url, false);
    client.setRequestHeader("Content-Type", "application/json");
    client.send(jsonData);

    if (client.status == 200) {

      alert(client.responseText);
      (client.responseText === "1" ? window.location.replace("http://127.0.0.1:5500/html/main.html") : alert("Wrong credentials"));
      
    } else {
      alert("Error");
    }


  }
  else {
    alert("Wrong input!")
  }
}