"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import "./NewsPage.scss";
import Link from "next/link";

export interface INews {
  _id: string;
  title: string;
  url: string;
  content: string;
  createdAt: string;
}

const pageSize: number = 10;

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsList, setNewsList] = useState<INews[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/news-list");
        setNewsList(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error("获取新闻列表失败：", err);
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const totalPages = Math.ceil(newsList.length / pageSize);
  const currentNewsList = newsList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="news-page">
      <div className="news-list">
        <h4>最新要闻</h4>
        {loading ? (
          <div>页面加载中...</div>
        ) : (
          <div className="important-news">
            {currentNewsList.map((news) => (
              <div key={news._id}>
                <Link href={`news/${news._id}`} target="_blank" rel="noopener noreferrer">
                  <h5>{news.title}</h5>
                </Link>
                <p>{news.createdAt}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <span
            onClick={() => {
              setCurrentPage(Math.max(currentPage - 1, 1));
            }}
          >
            上一页
          </span>

          {Array.from({ length: totalPages }).map((_, index) => (
            <span key={index} onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </span>
          ))}

          <span
            onClick={() => {
              setCurrentPage(Math.min(currentPage + 1, totalPages));
            }}
          >
            下一页
          </span>
        </div>
      </div>

      <div className="ranking-list">
        <ul className="ranking-level">
          <li>今日排行</li>
          <li>本周排行</li>
          <li>历史排行</li>
        </ul>
        <ol className="ranking-newsList">
          <li>No.1</li>
          <li>No.2</li>
          <li>No.3</li>
        </ol>
      </div>
    </section>
  );
}
