// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static("public"));

const storyData = {
  start: {
    speaker: "사람1",
    message: "안녕, 오랜만이야.",
    choices: [
      { text: "누구세요?", next: "scene1" },
      { text: "오, 잘 지냈어?", next: "scene2" }
    ]
  },
  scene1: {
    speaker: "사람1",
    message: "나 기억 안 나? 고등학교 때 같이...",
    choices: [
      { text: "아, 그때 그 사람?", next: "scene3" },
      { text: "잘 모르겠는데요.", next: "scene4" }
    ]
  },
  scene2: {
    speaker: "사람1",
    message: "응, 그럭저럭 잘 지냈지. 넌 어때?",
    choices: [
      { text: "나도 잘 지냈어.", next: "scene5" }
    ]
  },
  scene3: {
    speaker: "사람1",
    message: "맞아! 그때 자주 같이 게임하던 친구."
  },
  scene4: {
    speaker: "사람1",
    message: "흠, 좀 섭섭하네..."
  },
  scene5: {
    speaker: "사람1",
    message: "좋아! 그럼 요즘은 뭐 하고 지내?"
  }
};

app.get("/api/story/:id", (req, res) => {
  const scene = storyData[req.params.id];
  if (scene) res.json(scene);
  else res.status(404).json({ error: "Scene not found" });
});

app.listen(port, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${port}`);
});
