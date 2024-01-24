const loginForm = document.getElementById('form-box');

const username = document.querySelector('.username');
const password = document.querySelector('.password');
const login = checkInputsLogin();
loginForm.addEventListener('submit', e =>{
    //e.preventDefault();
    checkInputs();
   const login = checkInputsLogin();
    //window.location.href = "http://localhost:3000/index.html";
});

function checkInputs(){
    // get values of the inputs:
    const usernameValue = username.value;
    console.log(`Username: ${usernameValue}`);


    const passwordValue = password.value;
    console.log(`Password: ${passwordValue}`);

}

function checkInputsLogin(){
    // get values of the inputs:
    const usernameValue = username.value;
    


    const passwordValue = password.value;
   

}

 