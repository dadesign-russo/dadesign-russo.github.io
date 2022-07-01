//selecting all required elements
const dropArea4 = document.getElementById("drag-area4"),
    dropArea5 = document.getElementById("drag-area5"),
    dropArea6 = document.getElementById("drag-area6"),
    dragText4 = dropArea4.querySelector("header"),
    dragText5 = dropArea5.querySelector("header"),
    dragText6 = dropArea6.querySelector("header"),
    button4 = document.getElementById("button4"),
    button5 = document.getElementById("button5"),
    button6 = document.getElementById("button6"),
    input4 = document.getElementById("input4"),
    input5 = document.getElementById("input5"),
    input6 = document.getElementById("input6");

const indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB ||
    window.shimIndexedDB;

if (!indexedDB) {
    console.log("IndexedDB could not be found in this browser.");
}

const request = indexedDB.open("dbImages", 1);

//Potrebbe dare errore se lavori utilizzando la modalità di navigazione in incognito
request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
};

request.onupgradeneeded = function (event) {
    request.result.createObjectStore(event.target.result);
    request.result.createObjectStore("images");
};

function putImagesInDb (url,key){
    // Create XHR
    var xhr = new XMLHttpRequest(),
        blob;
    xhr.open("GET", url, true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            console.log("Image retrieved");
            // Blob as response
            blob = xhr.response;
            console.log("Blob:" + blob);
            console.log("Putting images in IndexedDB");
            // Open a transaction to the database
            var transaction = request.result.transaction("images","readwrite");
            // Put the blob into the dabase
            transaction.objectStore("images").put(blob, key);
        }
    }, false);
    // Send XHR
    xhr.send();
}

let file4; //this is a global variable and we'll use it inside multiple functions
button4.onclick = ()=>{
    input4.click(); //if user click on the button then the input also clicked
}
input4.addEventListener("change", function(){
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file4 = this.files[0];
    dropArea4.classList.add("active");
    showFile4(); //calling function
});
//If user Drag File Over DropArea
dropArea4.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    dropArea4.classList.add("active");
    dragText4.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea4.addEventListener("dragleave", ()=>{
    dropArea4.classList.remove("active");
    dragText4.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea4.addEventListener("drop", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file4 = event.dataTransfer.files[0];
    showFile4(); //calling function
});
function showFile4() {
    let fileType = file4.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.readAsDataURL(file4);
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            putImagesInDb(fileURL, "image4");
            let output4 = document.getElementById("output4");
            const div = document.createElement("div");

            //let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            div.innerHTML = `<img src="${fileURL}" alt="image">`;
            output4.innerHTML = div.innerHTML;

            //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }


    } else {
        alert("This is not an Image File!");
        dropArea4.classList.remove("active");
        dragText4.textContent = "Drag & Drop to Upload File";
    }
}
let file5; //this is a global variable and we'll use it inside multiple functions
button5.onclick = () => {
    input5.click(); //if user click on the button then the input also clicked
}
input5.addEventListener("change", function () {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file5 = this.files[0];
    dropArea5.classList.add("active");
    showFile5(); //calling function
});
//If user Drag File Over DropArea
dropArea5.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea5.classList.add("active");
    dragText5.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea5.addEventListener("dragleave", () => {
    dropArea5.classList.remove("active");
    dragText5.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea5.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file5 = event.dataTransfer.files[0];
    showFile5(); //calling function
});

function showFile5() {
    let fileType = file5.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            putImagesInDb(fileURL,"image5");
            let output5 = document.getElementById("output5");
            const div = document.createElement("div");
            div.innerHTML = `<img src="${fileURL}" alt="image">`;
            output5.innerHTML = div.innerHTML;
            // let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file5);
    } else {
        alert("This is not an Image File!");
        dropArea5.classList.remove("active");
        dragText5.textContent = "Drag & Drop to Upload File";
    }

}

let file6; //this is a global variable and we'll use it inside multiple functions
button6.onclick = ()=>{
    input6.click(); //if user click on the button then the input also clicked
}
input6.addEventListener("change", function(){
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file6 = this.files[0];
    dropArea6.classList.add("active");
    showFile6(); //calling function
});
//If user Drag File Over DropArea
dropArea6.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    dropArea6.classList.add("active");
    dragText6.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea6.addEventListener("dragleave", ()=>{
    dropArea6.classList.remove("active");
    dragText6.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea6.addEventListener("drop", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file6 = event.dataTransfer.files[0];
    showFile6(); //calling function
});
function showFile6() {
    let fileType = file6.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            putImagesInDb(fileURL,"image6");
            let output6 = document.getElementById("output6");
            const div = document.createElement("div");
            div.innerHTML = `<img src="${fileURL}" alt="image">`;
            output6.innerHTML = div.innerHTML;
            // let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }
        fileReader.readAsDataURL(file6);
    } else {
        alert("This is not an Image File!");
        dropArea3.classList.remove("active");
        dragText3.textContent = "Drag & Drop to Upload File";
    }
}