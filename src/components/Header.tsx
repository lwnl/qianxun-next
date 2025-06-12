'use client'

import './Header.scss'

export default function Header() {
  const date = new Date().toLocaleDateString('zh-CN', {
    year:'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })
  return (
    <header>
      <span>千寻/{date}</span>
    </header>
  )
}