"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { INews } from "../page";


export default function NewsDetailClient({ news }: { news: INews }) {
  const [fullNews, setFullNews] = useState<INews>(news);
  const [loading, setLoading] = useState(!news.content);

  useEffect(() => {
    if (news.content) return;

    const fetchContent = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/api/scrape", { url: news.url });
        setFullNews(prev => ({
          ...prev,
          content: res.data.content
        }));
      } catch (error) {
        console.error("获取内容失败", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [news]);

  return (
    <div className="newsDetail">
      <h2>{fullNews.title}</h2>
      <p>日期：{fullNews.createdAt}</p>
      
      {loading ? (
        <p>加载内容中...</p>
      ) : fullNews.content ? (
        <div dangerouslySetInnerHTML={{ __html: fullNews.content }} />
      ) : (
        <p>暂无内容</p>
      )}
    </div>
  );
}