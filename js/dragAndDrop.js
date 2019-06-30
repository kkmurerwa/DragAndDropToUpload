let placeHolders = document.getElementById("place-holders");
let placeholderImage = document.getElementById("placeholder-image");

let dropArea = document.getElementById('drop-area');
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
})

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

;
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
})

;
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
})

function highlight(e) {
    dropArea.classList.add('highlight')
    placeHolders.style.borderColor = "green";
    placeholderImage.style.opacity = null;
    placeholderImage.classList.add("image-hovered");
    placeHolders.style.color = "green";
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
    placeholderImage.classList.remove("image-hovered");
    placeHolders.style.borderColor = "gray";
    placeHolders.style.color = "black";
}

dropArea.addEventListener('drop', handleDrop, false)

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files
    handleFiles(files);
}

function handleFiles(files) {
    files = [...files]
    files.forEach(previewFile)
}

function previewFile(file) {
    let reader = new FileReader()
    let buttonObject = document.getElementById("buttonSelect")
    let placeholderText = document.getElementById("placeholder-text")
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        placeholderImage.src = reader.result
        placeholderText.innerHTML = "Image selected"
        if (window.matchMedia('(max-device-width: 700px)').matches) {
            placeholderImage.style.width = "auto";
            placeholderImage.style.height = "auto";
            placeholderImage.style.maxHeight = "500px";
        } else {
            placeholderImage.style.width = "auto";
            placeholderImage.style.maxHeight = "300px";
        }
    }
}