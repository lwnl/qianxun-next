"use client";

import { newsList } from "./mockData";
import { useState } from "react";
import "./NewsPage.scss";
import Link from "next/link";

const pageSize: number = 5;
const totalPages: number = Math.floor(newsList.length / pageSize);

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentNewsList = newsList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="news-page">
      <div className="news-list">
        <h4>最新要闻</h4>
        <div className="important-news">
          {currentNewsList.map((news) => (
            <div key={news.id}>
              <Link href={`news/${news.id}`}>
                <h5>{news.title}</h5>
              </Link>
              <p>{news.createdAt}</p>
            </div>
          ))}
        </div>

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
