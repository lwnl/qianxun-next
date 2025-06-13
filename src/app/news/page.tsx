"use client";

import { newsList } from "./mockData";
import { useState } from "react";

const pageSize: number = 5;
const totalPages: number = Math.floor(newsList.length / pageSize);

export default function NewsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const currentNewsList = newsList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <h4>最新要闻</h4>
      <div className="important-news">
        {currentNewsList.map((news) => (
          <div key={news.id}>
            <h3>{news.title}</h3>
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

      <div className="ranking-list">
        <h4>排行榜</h4>
      </div>
    </>
  );
}
