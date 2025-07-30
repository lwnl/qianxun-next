import { NewsModel } from '@/app/models/News';
import connectDB from '@/app/utils/connectDB';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    await connectDB();

    const _id = params._id;

    if (!_id) {
      return NextResponse.json({ error: '_id 无效' }, { status: 400 });
    }

    const news = await NewsModel.findOne({ _id });

    if (!news) {
      return NextResponse.json({ error: '找不到该新闻' }, { status: 404 });
    }

    return NextResponse.json({ data: news }, { status: 200 });
  } catch (error) {
    console.error('获取新闻条目失败', error);
    return NextResponse.json(
      { error: '服务器错误', detail: (error as Error).message },
      { status: 500 }
    );
  }
}