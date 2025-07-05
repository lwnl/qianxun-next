import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next';
import { extractContent } from '../utils/extractContent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query
  if (!url || typeof url !== 'string') {
    res.status(400).json({ error: '请提供有效url' });
    return;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      }
    })
    const content = extractContent(response.data.toString());
    res.json({ content });
  } catch (error) {
    res.status(500).json({
      error: '抓取失败',
      detail: (error as Error).message
    })
  }
}