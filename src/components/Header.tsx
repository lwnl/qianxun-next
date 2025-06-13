"use client";

import { useState } from "react";
import "./Header.scss";
import Link from "next/link";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const date = new Date().toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <header className="toolbar">
        <span>千寻/{date}</span>

        {/* 小屏菜单按钮 */}
        <button className="menu-button" aria-label="打开菜单">
          ☰
        </button>

        {/* 大屏导航栏 */}
        <nav className="nav-links">
          <Link href="/news">中国要闻</Link>
          <Link href="/videos">精彩视频</Link>
        </nav>

        {/* 搜索框 */}
        <div className="search-field">
          🔍 <input type="search" placeholder="搜索..." />
        </div>
      </header>

      {/* 侧边栏（小屏显示） */}
      <div className={`sidenav-container ${isSidebarOpen ? "open" : ""}`}>
        <aside className="sidenav">
          <div className="sidenav-header">
            <span>导航栏</span>
            <button onClick={toggleSidebar} aria-label="关闭菜单">
              x
            </button>
          </div>

          <nav className="sidenav-links">
            <Link href="/news" onClick={toggleSidebar}>
              中国要闻
            </Link>
            <Link href="/videos" onClick={toggleSidebar}>
              精彩视频
            </Link>
          </nav>

          <div className="sidenav-search">
            🔍 <input type="search" placeholder="搜索..." />
          </div>
        </aside>

        {/* 遮罩层 */}
        <div className="overlay" onClick={toggleSidebar}></div>
      </div>
    </>
  );
}
