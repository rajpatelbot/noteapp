export default function searchInput(e, search, setSearch, notes, setNotes) {
    setSearch(e.target.value);
    
    

    let j = 0;
    let searchNoteArr = [];
    let SearchKey = search.toLowerCase().trim();

    // if (SearchKey.includes("  ")) {
    //     for (let i = 0; i < SearchKey.length; i++) {
    //         SearchKey = SearchKey.replace("  ", " ");
    //     }
    // }

    for (let i = 0; i < notes.length; i++) {
        let title = notes[i].title.toLowerCase().trim();
        let description = notes[i].description.toLowerCase().trim();

        if (title.includes(SearchKey) || description.includes(SearchKey)) {
            searchNoteArr[j] = notes[i];
            j++;
        }
    }

    if (searchNoteArr.length === 0) {
        searchNoteArr.forEach((note) => {
            note.style.background = "2px solid red";
        })
    }

    
}