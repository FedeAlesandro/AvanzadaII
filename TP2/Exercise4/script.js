const span = document.getElementsByClassName("myClass");

function highlight(){
    for(let item of span){
        item.style.cssText = "background-color:black; color: yellow;";
       /*  item.style.setProperty("color", "yellow");
        item.style.setProperty("background-color", "black"); */
    } 
}