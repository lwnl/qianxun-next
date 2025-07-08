"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import './LoginPage.scss'

export default function LoginPage() {
  return (
    <section className="login-page">
      <form>
        <label>
          用户名
          <input type="text" name="username" required />
        </label>
        <label>
          密码
          <input type="password" name="password" required />
        </label>
        <button>登录</button>
      </form>
    </section>
  );
}
