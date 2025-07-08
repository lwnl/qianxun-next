"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { INews } from "../page";
import { useParams } from "next/navigation"; 

export default function NewsDetailPage() {
  const [news, setNews] = useState<INews | null>(null);
  const [fullNews, setFullNews] = useState<INews | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams(); // ✅ 获取参数
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    async function fetchNews() {
      try {
        setLoading(true);
        const newsRes = await axios.get(`/api/news/${id}`);
        const news = newsRes.data.data;
        setNews(news);

        const content = await fetchFullNewsContent(news.url);
        setFullNews({
          ...news,
          content,
        });
      } catch (error) {
        console.error("获取条目失败", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchFullNewsContent(url: string) {
      try {
        const res = await axios.post("/api/scrape", { url });
        return res.data.content;
      } catch (error) {
        console.error("抓取全文内容失败", error);
        return null;
      }
    }

    fetchNews();
  }, [id]);

  return (
    <div className="newsDetail">
      {loading ? (
        <p>加载内容中...</p>
      ) : fullNews ? (
        <>
          <h2>{fullNews.title}</h2>
          <p>日期：{fullNews.createdAt}</p>
          <div dangerouslySetInnerHTML={{ __html: fullNews.content }} />
        </>
      ) : (
        <p>未找到新闻内容</p>
      )}
    </div>
  );
}
