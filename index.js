// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };


function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}


const navlist = document.querySelector(".navlist")

const navmenu = document.querySelector("#navmenu")

const navclose = document.querySelector("#navclose")



console.log(navlist)
console.log(navmenu)

navmenu.addEventListener("click",()=>{
    console.log('clicked')
    console.log(navlist);
    navlist.style.left="0%"
    navmenu.style.display="none"
    navclose.style.display="block"
})

navclose.addEventListener("click",()=>{
    console.log('clicked')
    console.log(navlist);
    navlist.style.left="-200%"
    navclose.style.display="none"
    navmenu.style.display="block"
})



// todo

const inputBox = document.querySelector("#input-box")

const listcontainer = document.querySelector("#entered")

function addTask() {
    if (inputBox.value === "") {
        alert("You Must write Something!")
    }
    else {
        let li = document.createElement("li")
        li.innerHTML = inputBox.value;
        listcontainer.appendChild(li)

        let span = document.createElement("span")

        let img = document.createElement("img")

        img.src = "./img/close-circle-fill.png"

        span.appendChild(img)

        li.appendChild(span)

    }
    inputBox.value = ""
    saveData();
}


listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName == "LI") {

        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "IMG") {
        e.target.parentElement.parentElement.remove();
        saveData();
    }
}, false)


function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showData() {
    listcontainer.innerHTML = localStorage.getItem("data");
}


showData();



//password generator 

const passbox = document.querySelector("#passBox")
const passslider = document.querySelector("#passSlider")
const sliderValue = document.querySelector("#sliderValue")
const lowerCase = document.querySelector("#lowerCase")
const UpperCase = document.querySelector("#UpperCase")
const symbol = document.querySelector("#symbol")
const number = document.querySelector("#Number")
const genbtn = document.querySelector("#passGenerate")
const copybtn = document.querySelector("#CopyIcon")


sliderValue.textContent = passslider.value
passslider.addEventListener('input', () => {
    sliderValue.textContent = passslider.value
})

genbtn.addEventListener("click", () => {
    passbox.value = generatePassword();
})


let upperchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let lowerchars = "abcdefghijklmnopqrstuvwxyz"
let nums = "0123456789"
let symbols = "!@#$%^&*()"

const generatePassword = () => {
    let genpassword = "";
    let allChars = "";

    allChars += UpperCase.checked === true ? upperchars : ""

    allChars += lowerCase.checked === true ? lowerchars : ""

    allChars += number.checked === true ? nums : ""

    allChars += symbol.checked === true ? symbols : ""

    for (var i = 0; i < passslider.value; i++) {
        let randomnumber = Math.floor(Math.random() * allChars.length)
        genpassword += allChars[randomnumber]
    }

    return genpassword
}

copybtn.addEventListener("click", () => {
    if (passbox.value != "" || passbox.value.length >= 1) {
        navigator.clipboard.writeText(passbox.value);
        copybtn.title = "Password Copied"
        copybtn.classList.remove("ri-file-copy-line")
        copybtn.classList.add("ri-check-line")

        setTimeout(() => {
            copybtn.classList.add("ri-file-copy-line")
            copybtn.classList.remove("ri-check-line")
        }, 1500)
    }

})

generatePassword();


// notes js file
const notesContainer = document.querySelector(".notes-container")

const addNoteBtn = document.querySelector('#createNote')

const ndelete = document.querySelector(".input-box img");

let notes = document.querySelectorAll(".input-box")

addNoteBtn.addEventListener("click", () => {
    generateNotes()
})


const generateNotes = () => {

    const noteInput = document.createElement("p")


    noteInput.className = "input-box"

    noteInput.setAttribute("contenteditable", "true")



    const deleteicon = document.createElement("img")

    deleteicon.src = "img/delete.png"

    deleteicon.setAttribute('id', 'note-delete')



    notesContainer.appendChild(noteInput).appendChild(deleteicon)

    updateStorage()


}




notesContainer.addEventListener("click", (e) => {

    if (e.target.id === "note-delete") {
        e.target.parentElement.remove();
        updateStorage()
    }

    else if (e.target.tagName === p) {
        notes = document.querySelectorAll(".input-box")

        notes.forEach(nt => {
            nt.onKeyUp = function () {
                updateStorage()
            }
        })
    }
})

function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML)
}


function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes")
}

showNotes();


// speech convertor
let speech = new SpeechSynthesisUtterance();


let voices = []
let voiceselect = document.querySelector("#voiceSelect")

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];


    voices.forEach((voice, i) => (voiceselect.options[i]) = new Option(voice.name, i)
    )
}

document.querySelector("#convert").addEventListener("click", () => {
    speech.text = document.querySelector("#texttoconvert").value;

    window.speechSynthesis.speak(speech)
})

voiceselect.addEventListener("change", () => {

    speech.voice = voices[voiceselect.value]
})

// joke
const jokeButton = document.getElementById('jokebtn');

const joketext = document.querySelector("#joke")

jokeButton.addEventListener('click', getjoke)


async function getjoke() {
    const jokeData = await fetch(`https://icanhazdadjoke.com/`, {
        headers: { "Accept": "application/json" }

    })
    const jokeobj = await jokeData.json();
    let joke = jokeobj['id'] ? `${jokeobj['joke']}` : 'No Joke Found'


    joketext.textContent = joke


}

getjoke();


























