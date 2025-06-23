let currentId = "start";

async function showScene(id) {
  currentId = id;
  const res = await fetch(`/api/story/${id}`);
  const scene = await res.json();

  const messages = document.getElementById("messages");
  const choices = document.getElementById("choices");

  // 메시지 출력
  const msgElem = document.createElement("div");
  msgElem.className = "message";

  const speakerElem = document.createElement("div");
  speakerElem.className = "speaker";
  speakerElem.innerText = scene.speaker || "??";

  const textElem = document.createElement("div");
  textElem.className = "text";
  textElem.innerText = scene.message;

  msgElem.appendChild(speakerElem);
  msgElem.appendChild(textElem);
  messages.appendChild(msgElem);

  // 선택지 초기화
  choices.innerHTML = "";

  // 선택지 출력
  if (scene.choices) {
    scene.choices.forEach(choice => {
      const btn = document.createElement("button");
      btn.innerText = choice.text;
      btn.onclick = () => showScene(choice.next);
      choices.appendChild(btn);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "block";
    showScene("start");
  }, 3000); // 3초 후 intro 제거, 게임 시작, fadeout 효과
  showScene(currentId);
});


