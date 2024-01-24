const form = document.getElementById('container-form');
const username = document.querySelector('.username');
const password = document.querySelector('.password');
const email = document.querySelector('.email');



form.addEventListener('submit',(res, e )=>{
   //e.preventDefault();
    checkInputs();
   //sendInfo();
   //res = res.send(usernameValue, passwordValue );
});

function checkInputs(){
    // get values of the inputs:
    const usernameValue = username.value;
    console.log(`Username: ${usernameValue}`);


    const passwordValue = password.value;
    console.log(`Password: ${passwordValue}`);


    const emailValue = email.value;
    console.log(`Email: ${emailValue}`); 

    if(usernameValue === ''){
        // show error:
        // add error class
        setErrorFor(username, 'Username cannot be blank');
    }
    else{
        // add success class:
        setSuccesssFor(username);
    }
    return usernameValue, passwordValue;
}

function setErrorFor(input, message){
    const formControl = input.parentElement;    // .form-control
    const small = formControl.getElementById('error'); 
    small.innerText = message;
   

    // add error class:
    formControl.className = 'form-control error';


}

function setSuccesssFor(register){
    console.log(register);
}

function sendInfo(emailValue, usernameValue, passwordValue) {
     const username = usernameValue.value;
     console.log(username); 
    
} 
const check ={
    username: username.value,
    password: password.value};


