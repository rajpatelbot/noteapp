export default function speakText (title, description) {
  const msg1 = title
  const msg2 = description

  const Title = new SpeechSynthesisUtterance()
  const Desc = new SpeechSynthesisUtterance()

  Title.text = 'title is :' + msg1 + ',and,'
  Title.lang = 'hi'

  Desc.text = `description is : ${msg2}, Thanks for using me.`
  Desc.lang = 'hi'

  window.speechSynthesis.speak(Title)
  window.speechSynthesis.speak(Desc)
}
