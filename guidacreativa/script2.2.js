//selecting all required elements
const dropArea1 = document.getElementById("drag-area1"),
    dropArea2 = document.getElementById("drag-area2"),
    dropArea3 = document.getElementById("drag-area3"),
    dragText1 = dropArea1.querySelector("header"),
    dragText2 = dropArea2.querySelector("header"),
    dragText3 = dropArea3.querySelector("header"),
    button1 = document.getElementById("button1"),
    button2 = document.getElementById("button2"),
    button3 = document.getElementById("button3"),
    input1 = document.getElementById("input1"),
    input2 = document.getElementById("input2"),
    input3 = document.getElementById("input3");

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

let file1; //this is a global variable and we'll use it inside multiple functions
button1.onclick = ()=>{
    input1.click(); //if user click on the button then the input also clicked
}
input1.addEventListener("change", function(){
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file1 = this.files[0];
    dropArea1.classList.add("active");
    showFile1(); //calling function
});
//If user Drag File Over DropArea
dropArea1.addEventListener("dragover", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    dropArea1.classList.add("active");
    dragText1.textContent = "Release to Upload File";
});
//If user leave dragged File from DropArea
dropArea1.addEventListener("dragleave", ()=>{
    dropArea1.classList.remove("active");
    dragText1.textContent = "Drag & Drop to Upload File";
});
//If user drop File on DropArea
dropArea1.addEventListener("drop", (event)=>{
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file1 = event.dataTransfer.files[0];
    showFile1(); //calling function
});
function showFile1() {
    let fileType = file1.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.readAsDataURL(file1);
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            putImagesInDb(fileURL, "image1");
            let output1 = document.getElementById("output1");
            const div = document.createElement("div");

            //let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
            div.innerHTML = `<img src="${fileURL}" alt="image">`;
            output1.innerHTML = div.innerHTML;

            //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        }


    } else {
        alert("This is not an Image File!");
        dropArea1.classList.remove("active");
        dragText1.textContent = "Drag & Drop to Upload File";
    }
}
    let file2; //this is a global variable and we'll use it inside multiple functions
    button2.onclick = () => {
        input2.click(); //if user click on the button then the input also clicked
    }
    input2.addEventListener("change", function () {
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file2 = this.files[0];
        dropArea2.classList.add("active");
        showFile2(); //calling function
    });
//If user Drag File Over DropArea
    dropArea2.addEventListener("dragover", (event) => {
        event.preventDefault(); //preventing from default behaviour
        dropArea2.classList.add("active");
        dragText2.textContent = "Release to Upload File";
    });
//If user leave dragged File from DropArea
    dropArea2.addEventListener("dragleave", () => {
        dropArea2.classList.remove("active");
        dragText2.textContent = "Drag & Drop to Upload File";
    });
//If user drop File on DropArea
    dropArea2.addEventListener("drop", (event) => {
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file2 = event.dataTransfer.files[0];
        showFile2(); //calling function
    });

    function showFile2() {
        let fileType = file2.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if (validExtensions.includes(fileType)) { //if user selected file is an image file
            let fileReader = new FileReader(); //creating new FileReader object
            fileReader.onload = () => {
                let fileURL = fileReader.result; //passing user file source in fileURL variable
                putImagesInDb(fileURL,"image2");
                let output2 = document.getElementById("output2");
                const div = document.createElement("div");
                div.innerHTML = `<img src="${fileURL}" alt="image">`;
                output2.innerHTML = div.innerHTML;
                // let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
                //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
            }
            fileReader.readAsDataURL(file2);
        } else {
            alert("This is not an Image File!");
            dropArea2.classList.remove("active");
            dragText2.textContent = "Drag & Drop to Upload File";
        }

    }

    let file3; //this is a global variable and we'll use it inside multiple functions
    button3.onclick = ()=>{
        input3.click(); //if user click on the button then the input also clicked
    }
    input3.addEventListener("change", function(){
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file3 = this.files[0];
        dropArea3.classList.add("active");
        showFile3(); //calling function
    });
//If user Drag File Over DropArea
    dropArea3.addEventListener("dragover", (event)=>{
        event.preventDefault(); //preventing from default behaviour
        dropArea3.classList.add("active");
        dragText3.textContent = "Release to Upload File";
    });
//If user leave dragged File from DropArea
    dropArea3.addEventListener("dragleave", ()=>{
        dropArea3.classList.remove("active");
        dragText3.textContent = "Drag & Drop to Upload File";
    });
//If user drop File on DropArea
    dropArea3.addEventListener("drop", (event)=>{
        event.preventDefault(); //preventing from default behaviour
        //getting user select file and [0] this means if user select multiple files then we'll select only the first one
        file3 = event.dataTransfer.files[0];
        showFile3(); //calling function
    });
    function showFile3() {
        let fileType = file3.type; //getting selected file type
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
        if (validExtensions.includes(fileType)) { //if user selected file is an image file
            let fileReader = new FileReader(); //creating new FileReader object
            fileReader.onload = () => {
                let fileURL = fileReader.result; //passing user file source in fileURL variable
                putImagesInDb(fileURL,"image3");
                let output3 = document.getElementById("output3");
                const div = document.createElement("div");
                div.innerHTML = `<img src="${fileURL}" alt="image">`;
                output3.innerHTML = div.innerHTML;
                // let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
                //dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
            }
            fileReader.readAsDataURL(file3);
        } else {
            alert("This is not an Image File!");
            dropArea3.classList.remove("active");
            dragText3.textContent = "Drag & Drop to Upload File";
        }
    }