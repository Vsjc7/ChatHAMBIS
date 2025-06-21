const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // ← لعرض الواجهة

// ✅ ضع مفتاحك هنا بين علامتي التنصيص
const openai = new OpenAI({
  apiKey: "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"
});

app.post("/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "أجب فقط بالعربية وكن مساعدًا ذكيًا." },
        { role: "user", content: userMsg }
      ]
    });

    res.json({ reply: completion.choices[0].message.content });

  } catch (err) {
    console.error("❌ خطأ:", err.message);
    res.status(500).json({ reply: "❌ حدث خطأ في الخادم أو المفتاح غير صحيح." });
  }
});

app.listen(3000, () => {
  console.log("✅ الخادم يعمل على http://localhost:3000");
});
