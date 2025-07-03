import { notFound } from "next/navigation";
import { newsList } from "../mockData";

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const newsId = parseInt(params.id, 10);
  const news = newsList.find((news) => news.id === newsId);

  if (!news) return notFound;

  return (
    <div className="newsDetail">
      <h2>{news.title}</h2>
      <p>日期： {news.createdAt}</p>
      <p>{news.content}</p>
    </div>
  );
}
