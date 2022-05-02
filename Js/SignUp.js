function signup() {
    let name = $('#name').val();
    let email = $('#email').val();
    let pass= $('#password').val();
    let password = $('#confirmPassword').val();
 
    if(pass== password){
    let jsonData = JSON.stringify({
     'name': name, 'password': password, 'email': email
   });
    //const url = "https://murmuring-refuge-03345.herokuapp.com/register";
    const url = "http://localhost:3000/register";
    
    var client = new XMLHttpRequest();
    
    client.open("POST", url, false);
    client.setRequestHeader("Content-Type", "application/json");
    client.send(jsonData);
    
    if (client.status == 200){
       // alert("The request succeeded!\n\nThe response representation was:\n\n" + client.responseText)
        if(client.response==1){
          alert("valid sign in information.")
          window. location. replace("http://127.0.0.1:5500/html/login.html")
        }
 }
 
    
 }
 else{
 alert("Password do not match")
 }
 }