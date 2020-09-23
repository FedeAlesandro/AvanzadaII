const url = "https://utn-avanzada2-primerparcial.herokuapp.com/api/";
const tbody = document.querySelector("#data");
var studentsWithCareer = new Array();

class Student {
    constructor(studentId, career, lastName, firstName, email) {
        this.studentId = studentId;
        this.career = career;
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
    }
}

function get(url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "json";
        request.onload = () => {
            if (request.status == 200) {
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

function deleteApi(url) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("DELETE", url);
        request.onload = () => {
            if (request.status == 200) {
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

async function getCareers() {
    try {
        let urlAdd = "Career/";

        return await get(`${url}${urlAdd}`);
    } catch (error) {
        console.log(error.message);
    }

}

async function getStudents() {
    try {
        let urlAdd = "Student/";

        return await get(`${url}${urlAdd}`);
    } catch (error) {
        console.log(error.message);
    }
}

async function deleteStudent(id) {
    try {
        let urlAdd = "Student/";
        await deleteApi(`${url}${urlAdd}${id}`);
    } catch (error) {
        console.log(error.message);
    }
}

async function getStudentsWithCareer() {
    let careers = await getCareers();
    let students = await getStudents();
    let i = 0;
    let flag = true;
    let careersSize = getSize(careers);
    for (student of students) {
        while (i < careersSize && flag) { //lo hago con el while y el flag para que no siga recorriendo si ya lo encuentra
            let career = careers[i];
            if (student.careerId == career.careerId) { //null == career.careerId -> false
                if (career.active) { //career.active = true 
                    studentsWithCareer.push(
                        new Student(student.studentId,
                            career.name,
                            student.lastName,
                            student.firstName,
                            student.email));
                    flag = false;
                }
            }
            i++;
        }
        flag = true;
        i = 0;
    }

    return studentsWithCareer.sort((a, b) => (a.lastName).localeCompare(b.lastName));
}

function getSize(collection) {
    let size = 0;
    for (item of collection)
        size++;

    return size;
}

async function loadTable(){
    tbody.textContent = " ";
    if(studentsWithCareer.length == 0)
        studentsWithCareer = await getStudentsWithCareer();
    let size = getSize(studentsWithCareer);
    let i = 0;
    while(i < size){        
        let value = studentsWithCareer[i];
        let btn = document.createElement("button");
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        for(item in value){
            let td = document.createElement("td");
            td.append(document.createTextNode(value[item]));
            tr.append(td);
        }
        if(studentsWithCareer[i] != null){
            btnOnDelete(btn, studentsWithCareer[i]);
            td.append(btn);
            tr.append(td);
        }
        tbody.append(tr);
        i++;
    }    
}

function btnOnDelete (btn, student){
    btn.append(document.createTextNode("Delete"));
    btn.className = "btn btn-danger btn-sm";
    btn.onclick = () => {
        deleteStudent(student.studentId);
        studentsWithCareer.splice(studentsWithCareer.indexOf(student), 1);
        loadTable();
    }
}

window.onload = () => loadTable();