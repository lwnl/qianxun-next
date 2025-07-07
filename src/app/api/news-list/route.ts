import { NewsModel } from "@/app/models/News";
import connectDB from "@/app/utils/connectDB";
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB()
    const newsList = await NewsModel.find().sort({ createdAt: -1 })
    return NextResponse.json({
      data: newsList,
      message: '新闻列表加载成功'
    })
  } catch (error) {
    console.error("获取新闻列表失败：", error);
    return NextResponse.json(
      { error: error || "服务器错误" },
      { status: 500 }
    );
  }
}
