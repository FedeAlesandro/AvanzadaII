// MI SOLUCION

/* const table = document.getElementsByClassName("myTable")[0];

function insertRow(){
    let tr = document.createElement("tr");
    tr.appendChild(document.createTextNode("New row"));
    table.appendChild(tr);
}

function deleteRow(){
    if(table.lastChild.previousSibling != table.firstChild){
        table.removeChild(table.lastChild);
    }
} */


// SOLUCION PROFE

const table = document.getElementsByClassName("myTable")[0];

function insertRow() {
    let row = table.insertRow(); // por defecto es -1, eso indica que se agrega al final
    let cell1 = row.insertCell(); // por defecto es -1, eso indica que se agrega al final
    let cell2 = row.insertCell(); // por defecto es -1, eso indica que se agrega al final
    cell1.innerHTML = "Value";
    cell2.innerHTML = "Value";
}

function deleteRow() {
    if (table.rows.length > 1)  //table.rows es ya propio de js
        table.deleteRow(-1); //-1 indica que le eliminas el ultimo
}