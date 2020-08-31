const productName1 = "shoes";
const productName2 = "hoodies";
const productName3 = "pants";
const product1 = document.getElementById(productName1);
const product2 = document.getElementById(productName2);
const product3 = document.getElementById(productName3);
const wishlist = document.getElementById("wishlist");

product1.addEventListener("click", () => {
    if (!wishlist.innerHTML.includes(productName1)) {
        let tag = document.createElement("li");
        let removeButton = createRemoveButton(tag);        
        let upPriority = createUpPriority(tag);
        let downPriority = createDownPriority(tag);
        let text = document.createTextNode(productName1);
        tag.appendChild(text);
        tag.appendChild(removeButton);
        tag.appendChild(upPriority);
        tag.appendChild(downPriority);
        wishlist.appendChild(tag);
    }
})


product2.addEventListener("click", () => {
    if (!wishlist.innerHTML.includes(productName2)) {
        let tag = document.createElement("li");
        let removeButton = createRemoveButton(tag);        
        let upPriority = createUpPriority(tag);
        let downPriority = createDownPriority(tag);
        let text = document.createTextNode(productName2);
        tag.appendChild(text);
        tag.appendChild(removeButton);
        tag.appendChild(upPriority);
        tag.appendChild(downPriority);
        wishlist.appendChild(tag);
    }
})

product3.addEventListener("click", () => {
    if (!wishlist.innerHTML.includes(productName3)) {
        let tag = document.createElement("li");
        let removeButton = createRemoveButton(tag);        
        let upPriority = createUpPriority(tag);
        let downPriority = createDownPriority(tag);
        let text = document.createTextNode(productName3);
        tag.appendChild(text);
        tag.appendChild(removeButton);
        tag.appendChild(upPriority);
        tag.appendChild(downPriority);
        wishlist.appendChild(tag);
    }
})

function createUpPriority(tag) {
    let upPriority = document.createElement("button");
    upPriority.appendChild(document.createTextNode("↑"));
    upPriority.addEventListener("click", () => {
        if (!(tag.previousSibling == null)) {
            wishlist.insertBefore(tag, tag.previousSibling)
        }
    })
    return upPriority;
}
function createDownPriority(tag) {
    let downPriority = document.createElement("button");
    downPriority.appendChild(document.createTextNode("↓"));
    downPriority.addEventListener("click", () => {
        if (!(tag.nextSibling == null)) {
            wishlist.insertBefore(tag.nextSibling, tag);
        }
    })
    return downPriority;
}
function createRemoveButton(tag) {
    let removeButton = document.createElement("button");
    removeButton.appendChild(document.createTextNode("-"));
    removeButton.addEventListener("click", () => {
        tag.parentNode.removeChild(tag);
    })
    return removeButton;
}
