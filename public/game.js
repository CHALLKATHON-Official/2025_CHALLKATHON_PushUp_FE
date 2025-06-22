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
  msgElem.innerText = scene.message;
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
  showScene(currentId);
});
