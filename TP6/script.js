const url = "https://utn-avanzada2-tp6.herokuapp.com/api/";
const btnNav = document.querySelector("#btnNav");
const tbody = document.querySelector("#data");
const itemsPerPages = 10;
const form = document.querySelector("#employeeForm");
const companyId = document.querySelector('#companyId');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');

class Employee {
    constructor(employeeId, companyId, companyName, firstName, lastName, email) {
        this.employeeId = employeeId;
        this.companyId = companyId;
        this.companyName = companyName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

function get(url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.onload = () => {
            if (request.status <= 300) {
                resolve(request.response);
            } else {
                reject(Error("Data couldn't be loaded. Error: " + request.statusText));
            }
        }
        request.onerror = () => {
            reject(Error("Oops!, there was a network error"));
        }

        request.send();
    });
}

function post(url, json) {
    return new Promise((resolve, reject) => {
         
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onload  =  () => {
            if (xhr.status <= 300) {
                resolve(xhr.response);
            } else {
                reject(Error("Post couldn't be done. Error: " + xhr.statusText));
            }
        }
        xhr.onerror =  () => {
            reject(Error("Oops!, there was a network error"));
        }
        xhr.send(json);
    });
}

function deleteApi(url){
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("DELETE", url);
        request.onload = () => {
            if (request.status <= 300) {
                resolve(request.response);
            } else {
                reject(Error("Delete couldn't be done. Error: " + request.statusText));
            }
        }
        request.onerror = () => {
            reject(Error("Oops!, there was a network error"));
        }

        request.send();
    });
}

async function getEmployeesWithCompany(){
    let companies = await getCompanies();
    let employees = await getEmployees();
    let employeesWithCompany = new Array();
    let i = 0;
    let flag = true;
    let companiesSize = getSize(companies);
    for(employee of employees){
        while(i < companiesSize && flag){
            let company = companies[i];
            if(employee.companyId == company.companyId){
                employeesWithCompany.push(
                    new Employee(employee.employeeId,
                         company.companyId,
                         company.name,
                         employee.firstName,
                         employee.lastName,
                         employee.email));
                flag = false;
            }
            i++;
        }
        flag = true;
        i = 0;
    }

    return employeesWithCompany;
}

function getSize(collection){
    let size = 0;
    for(item of collection)
        size++;
    return size;
}

async function getCompanies() {
    try {
        let urlAdd = "Company/";
        return await get(`${url}${urlAdd}`);
    } catch (error) {
        console.log(error.message);
    }

}

async function getEmployees() {
    try {
        let urlAdd = "Employee/";
    
        return await get(`${url}${urlAdd}`);
    } catch (error) {
        console.log(error.message);
    }
}

async function postEmployee(data) {
    try {
        let urlAdd = "Employee/";
            
        let json = JSON.stringify(data);
        await post(`${url}${urlAdd}`, json);
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteEmployee(){
    try {
        let urlAdd = "Employee/";
        let id = 1000;
        await deleteApi(`${url}${urlAdd}${id}`);
    } catch (error) {
        console.log(error.message);
    }
}

async function createPages(){
    let employeesWithCompany = await getEmployeesWithCompany();
    let size = getSize(employeesWithCompany);
    let i = 0;
    while(i < (size/itemsPerPages)){
        let btn = document.createElement("button");
        btn.id = "btn" + i;
        btn.append(document.createTextNode(i+1));
        btnNav.append(btn);
        let newBtn = document.querySelector("#btn" + i);
        btnOnClick(i, newBtn, itemsPerPages, employeesWithCompany);
        if(((i+1) % 20) == 0){
            btnNav.append(document.createElement("br"));
        }
        i++;
    }
}

function btnOnClick (i, newBtn, itemsPerPages, collection) {
    newBtn.onclick = () => {
        tbody.textContent = " ";

        let to = (i+1)*itemsPerPages;

        let from = to-(itemsPerPages);
        
        while(from < to){
            let value = collection[from];
            let tr = document.createElement("tr");
            for(item in value){
                let td = document.createElement("td");
                td.append(document.createTextNode(value[item]));
                tr.append(td);
            }
            tbody.append(tr);
            from++;
        }    
    }
}

form.addEventListener("submit", sendData());

function sendData(){
    let data = {
        companyId: companyId.value,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
    }
    postEmployee(data);
}

window.onload = () => {
    createPages();
}
