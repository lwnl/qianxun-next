import { NewsModel } from "../models/News"
import connectDB from "./connectDB"

const newsList = [
  {
    id: 1,
    title: "因信仰",
    url: "https://www.epochtimes.com/gb/25/7/1/n14542692.htm",
    content: "",
    createdAt: "2025-07-01"
  },
  {
    id: 2,
    title: "7月飘雪 青海祁连大草原一夜之间白雪皑皑",
    url: "https://www.epochtimes.com/gb/25/7/4/n14544734.htm",
    content: "",
    createdAt: "2025-07-04"
  },
  {
    id: 3,
    title: "中共将藏族幼童送寄宿学校 令其脱离藏文化",
    url: "https://www.epochtimes.com/gb/25/7/4/n14544722.htm",
    content: "",
    createdAt: "2025-07-04"
  },
  {
    id: 4,
    title: "宁波、上海等地出现巨大“日晕”",
    url: "https://www.epochtimes.com/gb/25/7/4/n14544699.htm",
    content: "",
    createdAt: "2025-07-04"
  },
  {
    id: 5,
    title: "荷兰指控俄军广泛使用化武 吁加大制裁",
    url: "https://www.epochtimes.com/gb/25/7/4/n14544672.htm",
    content: "",
    createdAt: "2025-07-04"
  }]


async function init() {
  await connectDB()

  await NewsModel.deleteMany()
  console.log('🧹 已清除旧数据');

  await NewsModel.insertMany(newsList)
  console.log('✅ 初始数据已插入');
  process.exit(0)
}

init().catch(err => {
  console.error('❌ 数据库初始化失败:', err);
  process.exit(1);
})