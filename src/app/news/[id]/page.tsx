"use client";
import { notFound } from "next/navigation";
import { newsList } from "../mockData";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const [news, setNews] = useState(() => {
    const newsId = parseInt(params.id, 10);
    return newsList.find((news) => news.id === newsId) || null;
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const apiUrl = "http://localhost:3000/api/scrape";
        const res = await axios.get(apiUrl, { params: { url: news?.url } });
        setNews((prevNews) =>
          prevNews ? { ...prevNews, content: res.data.content } : prevNews
        );
      } catch (error) {
        console.log("获取内容失败", error);
      }
    };
    if (!news) return;
    fetchContent();
  }, [news?.url]);

  if (!news) return notFound();

  return (
    <div className="newsDetail">
      <h2>{news.title}</h2>
      <p>日期： {news.createdAt}</p>
      <div dangerouslySetInnerHTML={{ __html: news.content }}></div>
    </div>
  );
}
