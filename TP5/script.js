const tbody = document.querySelector("#users");
const allUsers = document.querySelector("#allBtn");
const pageBtn = document.querySelector("#pageBtn");
const amountPages = 10;

class User {
    constructor(userId, firstName, lastName, email, gender, lastConnectedAddress) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = gender;
        this.lastConnectedAddress = lastConnectedAddress;
    }
}

function getUsers(url){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.onload = () => {
            if(request.status == 200){
                resolve(request.response);
            } else{
                reject(Error("Users couldn't be loaded. Error: " + request.statusText));
            }
        }
        request.onerror = () => {
            reject(Error("Oops!, there was a network error"));
        }
        
        request.send();
    });
}

window.onload = async function createPages(){
    await getUsers("https://utn-avanzanda2-tp5.herokuapp.com/api/User/Total")
    .then(resolve => {
        let i = 0;
        while(i < (resolve/amountPages)){
            let btn = document.createElement("button");
            btn.id = "btn" + i;
            btn.append(document.createTextNode(i+1));
            pageBtn.append(btn);
            let newBtn = document.querySelector("#btn" + i);
            btnOnClick(i, newBtn);
            if(((i+1) % 20) == 0){
                pageBtn.append(document.createElement("br"));
            }
            i++;
        }
    })
    .catch(reject => {
        console.log(Error(reject));
    })
}

allUsers.onclick = async () => {
    tbody.textContent = " ";
    await getUsers("https://utn-avanzanda2-tp5.herokuapp.com/api/User")
    .then(resolve => {
        for(user of resolve){
            let tr = document.createElement("tr");
            for(value in user){
                let td = document.createElement("td");
                td.append(document.createTextNode(user[value]));
                tr.append(td);
            }
            tbody.append(tr);
        }
    })
    .catch(reject => {
        console.log(Error(reject))
    })
}

function btnOnClick (i, newBtn) {
    newBtn.onclick = async () => {
        tbody.textContent = " ";
        to = (i+1)*amountPages;
        from = to-(amountPages-1);
        await getUsers(`https://utn-avanzanda2-tp5.herokuapp.com/api/User/${from}/${to}`)
        .then(resolve => {
            for(user of resolve){
                let tr = document.createElement("tr");
                for(value in user){
                    let td = document.createElement("td");
                    td.append(document.createTextNode(user[value]));
                    tr.append(td);
                }
                tbody.append(tr);
            }
        })
        .catch(reject => {
            console.log(Error(reject))
        })
    }
}
