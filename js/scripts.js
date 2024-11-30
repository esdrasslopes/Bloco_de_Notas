// Elementos
const NotesContainer = document.querySelector("#notes-container");

const NoteInput = document.querySelector("#note-content");

const addNoteBtn = document.querySelector(".add-note");

const searchInput = document.querySelector("#search-input");

const exportBtn = document.querySelector(".button");
// Funções
function cleanNotes() {
  NotesContainer.replaceChildren([]);
}

function generateID() {
  return Math.floor(Math.random() * 5000);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  NotesContainer.removeChild(element);

  saveNotes(notes);
}

function ToggleFixNotes(id) {
  const notes = getNotes();

  const targetNote = notes.filter((note) => note.id === id)[0];

  targetNote.fixed = !targetNote.fixed;

  saveNotes(notes);

  loadNotes();
}

function copyNotes(id) {
  const notes = getNotes();

  const targetNote = notes.filter((note) => note.id === id)[0];

  const NoteObject = {
    id: generateID(),
    content: targetNote.content,
    fixed: false,
  };

  const noteElement = createNote(
    NoteObject.id,
    NoteObject.content,
    NoteObject.fixed
  );

  NotesContainer.appendChild(noteElement);

  notes.push(NoteObject)

  saveNotes(notes)
}

function updateNote(id, newContent){
  const notes = getNotes();

  const targetNote = notes.filter((note)=> note.id === id)[0];

  targetNote.content = newContent;

  saveNotes(notes);
}

function searchNotes(search){
    const searchresults = getNotes().filter((note)=>{
      return note.content.includes(search);
    });

    if(search != ""){
      cleanNotes();
      searchresults.forEach(note=>{
        const noteElement = createNote(note.id, note.content, note.fixed);


        NotesContainer.appendChild(noteElement);
      })

      return;
    }

    cleanNotes();

    loadNotes();
}

function createNote(id, content, fixed) {
  const element = document.createElement("div");

  element.classList.add("note");

  const textarea = document.createElement("textarea");

  textarea.value = content;

  textarea.placeholder = "Adicione algum texto...";

  element.appendChild(textarea);

  const pinIcon = document.createElement("i");

  pinIcon.classList.add(...["bi", "bi-pin"]);

  element.appendChild(pinIcon);

  const deleteIcon = document.createElement("i");

  deleteIcon.classList.add(...["bi", "bi-x-lg"]);

  element.appendChild(deleteIcon);

  const duplicateIcon = document.createElement("i");

  duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);

  element.appendChild(duplicateIcon);
  if (fixed) {
    element.classList.add("fixed");
  }

  element.querySelector("textarea").addEventListener("keyup", (e)=>{
    const newContent = e.target.value

    updateNote(id, newContent);
  })

  element.querySelector(".bi-pin").addEventListener("click", () => {
    ToggleFixNotes(id);
  });

  element.querySelector(".bi-x-lg").addEventListener("click", () => {
    deleteNote(id, element);
  });

  element
    .querySelector(".bi-file-earmark-plus")
    .addEventListener("click", () => {
      copyNotes(id);
    });

  return element;
}

function addNote() {
  const notes = getNotes();

  const NoteObject = {
    id: generateID(),
    content: NoteInput.value,
    fixed: false,
  };

  const NoteElement = createNote(NoteObject.id, NoteObject.content);

  NotesContainer.appendChild(NoteElement);
  saveNotes(notes);

  notes.push(NoteObject);

  saveNotes(notes);

  NoteInput.value = "";
}

function exportData(){
  const notes = getNotes();

  const csvString = 
  [
    ["ID", "Conteúdo", "Fixado?"],
    ...notes.map((note)=>[note.id, note.content, note.fixed])
  ].map((e) => e.join(",")).join("\n");

  const element = document.createElement("a");

  element.href = "data:text/csv;charset-utf-8," + encodeURI(csvString);

  element.target = "_blank"

  element.download = "notes.csv";

  element.click();
}

// Local Storage
function getNotes() {
  const notes = JSON.parse(localStorage.getItem("notes") || "[]");

  const orderedNotes = notes.sort((a, b) => (a.fixed > b.fixed ? -1 : 1));

  return orderedNotes;
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  cleanNotes();

  getNotes().forEach((note) => {
    const NoteElement = createNote(note.id, note.content, note.fixed);

    NotesContainer.appendChild(NoteElement);
  });
}

// Eventos
addNoteBtn.addEventListener("click", (e) => {
  addNote();
});

NoteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addNote();
});

searchInput.addEventListener("keyup", (e)=>{
  const search = e.target.value;

  searchNotes(search);
})

exportBtn.addEventListener("click", ()=>{
  exportData();
})
// Inicialização das notas salvas
loadNotes();
