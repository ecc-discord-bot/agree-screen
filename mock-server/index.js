import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

// サンプル
import sampleData from "../json/sample.json" with { type: "json" }; 

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = process.env.DATABASE_ID;

console.log("NOTION_TOKEN", NOTION_TOKEN);
console.log("DATABASE_ID", DATABASE_ID);

async function fetchNotionData() {
  const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      filter: {
        property: "status",
        multi_select: {
          contains: "now",
        },
      },
      sorts: [
        {
          property: "number",
          direction: "ascending",
        },
      ],
    }),
  });

  console.log("response", response);

  return response.json();
}

// ページ内の子ブロックを再帰的に取得
async function fetchBlockChildren(blockId) {
  const url = `https://api.notion.com/v1/blocks/${blockId}/children`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
  });
  console.log("response", response);
  const data = await response.json();

  // 子ブロックも再帰的に取得
  const children = await Promise.all(
    data.results.map(async (block) => {
      if (block.has_children) {
        const nestedChildren = await fetchBlockChildren(block.id);
        console.log("nestedChildren", nestedChildren);
        return { ...block, children: nestedChildren };
      }
      return block;
    })
  );

  return children;
}

// POSTエンドポイント
app.post("/notion", async (req, res) => {
  try {
    // const data = await fetchNotionData();

    // if (!data.results || data.results.length === 0) {
    //   return res.status(404).json({ error: "データが見つかりませんでした" });
    // }

    // // 子ブロック付きのデータを構成
    // const resultsWithContent = await Promise.all(
    //   data.results.map(async (result) => {
    //     const content = await fetchBlockChildren(result.id);
    //     return {
    //       id: result.id,
    //       properties: result.properties,
    //       content,
    //     };
    //   })
    // );
    // res.json(resultsWithContent);
    // サンプルを返すようにしている
    const data = sampleData;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
});

app.post("/add", async (req, res) => {
  try {
    const studentName = req.body.studentName;
    const studentClass = req.body.studentClass;

    // 5秒
    await new Promise((resolve) => setTimeout(resolve, 5000));
    res.status(201).json({ message: "データが追加されました。" });
  } catch (error) {
    res.status(500).json({ error: "サーバーエラー" });
  }
});

app.listen(3000, () => console.log("うごいてるよ http://localhost:3000"));
