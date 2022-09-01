export default function searchInput (e, search, setSearch, notes, setNotes) {
  let j = 0
  const searchNoteArr = []
  const SearchKey = search.toLowerCase().trim()

  // if (SearchKey.includes("  ")) {
  //     for (let i = 0; i < SearchKey.length; i++) {
  //         SearchKey = SearchKey.replace("  ", " ");
  //     }
  // }

  for (let i = 0; i < notes.length; i++) {
    const title = notes[i].title.toLowerCase().trim()
    const description = notes[i].description.toLowerCase().trim()

    if (title.includes(SearchKey) || description.includes(SearchKey)) {
      searchNoteArr[j] = notes[i]
      j++
    }
  }

  if (searchNoteArr.length === 0) {
    searchNoteArr.forEach((note) => {
      note.style.background = '2px solid red'
    })
  }
}
