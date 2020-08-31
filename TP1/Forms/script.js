const form = document.getElementById("form");

const name = document.getElementById("name");
const lastName = document.getElementById("lastName");
const age = document.getElementById("age");
const pwd = document.getElementById("pwd");
const email = document.getElementById("email");

const nameError = document.getElementById("nameError");
const lastNameError = document.getElementById("lastNameError");
const ageError = document.getElementById("ageError");
const pwdError = document.getElementById("pwdError");
const emailError = document.getElementById("emailError");

form.addEventListener("submit", (e) => {
    let prevent = false;

    prevent = validateName(name.value);

    prevent = validateLastName(lastName.value, prevent);
    
    prevent = validateAge(age.value, prevent);

    prevent = validatePwd(pwd.value, prevent);

    prevent = validateEmail(email.value, prevent);

    if(prevent){
        e.preventDefault();
    }
})

function validateName(name){   
    if(name === "" || name == null){
        nameError.innerHTML = "Name is required";
        return true;
    }
    if(name.length > 20){
        nameError.innerHTML = "The name can't exceed 20 letters";
        return true;
    }
    if(!/^[a-zA-Z]+$/.test(name)){
        nameError.innerHTML = "The name can't have special characters";
        return true;
    }
    
    nameError.innerHTML = "";

    return false;
}

function validateLastName(lastName, prevent){   
    if(lastName === "" || lastName == null){
        lastNameError.innerHTML = "Last name is required";
        return true;
    }
    if(lastName.length > 20){
        lastNameError.innerHTML = "The last name can't exceed 20 letters";
        return true;
    }
    if(!/^[a-zA-Z]+$/.test(lastName)){
        lastNameError.innerHTML = "The last name can't have special characters";
        return true;
    }

    lastNameError.innerHTML = "";

    return prevent ? true : false;
}

function validateAge(age, prevent){
    if(!/^[0-9]*$/.test(age)){
        ageError.innerHTML = "The age can only be numbers";
        return true;
    }

    ageError.innerHTML = "";

    return prevent ? true : false;
}

function validatePwd(pwd, prevent){
    if(pwd === "" || pwd == null){
        pwdError.innerHTML = "Password is required";
        return true;
    }
    if(pwd.length < 9 || pwd.length > 20){
        pwdError.innerHTML = "The password must be between 9 and 20 characters";
        return true;
    }
    if(!(/[A-Z]/.test(pwd) && /[a-z]/.test(pwd) && /[0-9]/.test(pwd))){
        pwdError.innerHTML = "The password must contain at least one uppercase, one lowercase and one number";
        return true;
    }

    pwdError.innerHTML = "";

    return prevent ? true : false;
}

function validateEmail(email, prevent){
    if(email === "" || email == null){
        emailError.innerHTML = "Email is required";
        return true;
    }
    if(!/^[\w-\.]+@(outlook|gmail|icloud)\.+[a-z]{2,4}$/.test(email)){
        emailError.innerHTML = "It must be in email format and it only can be from gmail, outlook or icloud";
        return true;
    }
    emailError.innerHTML = "";

    return prevent ? true : false;
}
