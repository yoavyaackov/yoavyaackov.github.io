
var noteArray = new Array();

function addNote(taskObj) {
    var i = noteArray.length;
    var divTag = document.createElement("div");
    divTag.id = taskObj.id;
    var closeNoteButton = document.createElement("span");
    var textOnNote = document.createElement("div");
    var taskNum = document.createElement("div"); 
    var textArea = document.createElement("div");
    var date = document.createElement("div");
    var time = document.createElement("div");
    textArea.classList.add("textAreaClass");
    date.classList.add("dateClass");
    time.classList.add("timeClass");
    taskNum.classList.add("taskNumClass");
    taskNum.innerHTML = taskObj.taskNum;
    divTag.appendChild(taskNum);
    textArea.innerHTML = taskObj.taskdetails;
    divTag.appendChild(textArea);
    date.innerHTML = taskObj.textDate;
    divTag.appendChild(date);
    time.innerHTML = taskObj.taskTime;
    divTag.appendChild(time);
    closeNoteButton.classList.add("glyphicon");
    closeNoteButton.classList.add("glyphicon-remove");
    closeNoteButton.classList.add("transperent-glyph"); //boostrap class to display none.
    closeNoteButton.onmouseenter = CloseOnMouseOver;
    closeNoteButton.onmouseleave = CloseNoteOnMouseLeave;
    closeNoteButton.classList.add("closeNoteButton");
    closeNoteButton.onclick = closeFunc;
    textOnNote.classList.add("numCount")
    divTag.appendChild(textOnNote);
    divTag.appendChild(closeNoteButton);
    divTag.classList.add("divStyle");
    divTag.classList.add("col-sm-2");
    divTag.classList.add("notePad");
    document.getElementById("taskCont").appendChild(divTag).focus();
    divTag.classList.add("show");
    noteArray.push(divTag);
}

function CloseNoteOnMouseLeave(event) {
    //console.log("on mouse leave");
    event.target.classList.remove('color-glyph');
    event.target.classList.add('transperent-glyph');
}

function CloseOnMouseOver(event) {
    //console.log("onmouseover");
    event.target.classList.add('color-glyph');
    event.target.classList.remove('transperent-glyph');
}

function save() {
    var taskNum = document.getElementById("taskNum").value;
    var taskTime = document.getElementById("taskTime").value;
    var textDate = document.getElementById("textDate").value;
    var taskdetails = document.getElementById("taskdetails").value;

    if (!taskNum ) { alert("Enter Task Number")}
  

    var notes =localStorage.getItem('notes');
    notes = JSON.parse(notes);
    var id = notes.length;
    
    var taskObj = {
        id : id,
        taskNum: taskNum, 
        taskTime: taskTime,
        textDate: textDate,
        taskdetails: taskdetails
    }

        addNote(taskObj);

        notes.push(taskObj);
        localStorage.setItem('notes', JSON.stringify(notes));
    
}
// close the notepad
function closeFunc(event) {
    var id = event.target.parentElement.id;
    event.target.parentElement.classList.remove("show");
    var notes = JSON.parse(localStorage.getItem('notes'));
    for(var i = 0; i < notes.length; i++) {
        if (notes[i] != null && notes[i].id == id) {
            console.log("removing item in Index=" + i);
            notes[i] = null; //set the note with id to empty.
        }
    }
    localStorage.setItem('notes', JSON.stringify(notes));

    setTimeout(() => {
        event.target.parentElement.remove()
    }, 600)
}
//clear cache
//localStorage.removeItem('notes');

//runs when the page is loaded
var notes = localStorage.getItem('notes');
if (notes == null) {
    notes = JSON.stringify([]);
}

notes = JSON.parse(notes);

for (var i =0; i < notes.length; i++ ){
    var note = notes[i];
    if (note != null){ //if current note is not empty
        addNote(note);
    }

}

localStorage.setItem('notes', JSON.stringify(notes));
