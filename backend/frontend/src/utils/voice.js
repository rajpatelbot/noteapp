export default function speakText(title, description) {
    let msg1 = title;
    let msg2 = description;

    var Title = new SpeechSynthesisUtterance();
    var Desc = new SpeechSynthesisUtterance();

    Title.text = "title is :" + msg1 + ",and,";
    Title.lang = "hi";

    Desc.text = `description is : ${msg2}, Thanks for using me.`;
    Desc.lang = "hi";

    window.speechSynthesis.speak(Title);
    window.speechSynthesis.speak(Desc);
}
