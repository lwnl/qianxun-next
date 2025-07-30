import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import { extractContent } from '@/app/utils/extractContent';

export const dynamic = 'force-dynamic'; // 确保 API 路由是动态的

export async function POST(req: NextRequest ) {
  try {
    const { url } = await req.json();
    
    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: '请提供有效URL' }, 
        { status: 400 }
      );
    }

    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });

    const content = extractContent(response.data);
    return NextResponse.json({ content });
    
  } catch (error: any) {
    return NextResponse.json(
      {
        error: '抓取失败',
        detail: error.message || '未知错误',
      },
      { status: 500 }
    );
  }
}