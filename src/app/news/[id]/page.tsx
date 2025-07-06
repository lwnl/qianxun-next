import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";
import { newsList } from "../mockData";

// 1. 定义预生成的静态路径
/* 1. generateStaticParams() 的作用
静态生成（Static Generation）：
Next.js 会在构建时调用 generateStaticParams()，根据返回的路径列表（如 [{ id: '1' }, { id: '2' }]）预先生成对应的静态页面（如 /news/1, /news/2）。

这些页面会被编译为 HTML 文件，后续访问时直接返回，无需运行时渲染，性能更高。

运行时行为：
如果用户访问一个未被预生成的路径（如 /news/999），Next.js 会：

如果 dynamicParams: true（默认）：动态生成该页面（SSR）。

如果 dynamicParams: false：返回 404。 */
export async function generateStaticParams() {
  return newsList.map(item => ({
    id: item.id.toString(), // 必须转换成字符串（URL参数总是字符串）
  }));
}

type PageProps = {
  params: {
    id: string;
  };
};


export default async function NewsDetailPage({ params }: PageProps) {
  
  const newsId = parseInt(params.id);
  const news = newsList.find((item) => item.id === newsId);

  if (!news) return notFound();

  return <NewsDetailClient news={news} />;
}