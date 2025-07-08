import { NewsModel } from '@/app/models/News';
import connectDB from '@/app/utils/connectDB';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: '访问方法不对'
    })
  }

  try {
    await connectDB()

    const { id } = req.query
    if (!id) {
      return res.status(400).json({
        error: 'id 无效'
      })
    }

    const news = await NewsModel.findOne({ id: Number(id) })
    if (!news) {
      return res.status(404).json({
        error: '找不到该新闻'
      })
    }

    return res.status(200).json({
      data: news
    })
  } catch (error) {
    console.error('获取新闻条目失败', error)
    return res.status(500).json({
      error: error || '服务器错误'
    })
  }
}