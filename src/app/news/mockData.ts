export const newsList = Array.from({ length: 20 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() - index); // 今天开始，往前推一天、两天...
  return {
    id: index + 1,
    title: `第${index + 1}条新闻标题`,
    content: `这是第${index + 1}条新闻的简短内容， ${randomText(100)}。`,
    editor: `编辑${index + 1}`,
    createdAt: date.toLocaleDateString(),
  };
}) as {
  id: number;
  title: string;
  content: string;
  editor: string;
  createdAt: string;
}[];

function randomText (length: number): string {
  let text = ''
  for (let i = 0; i < length; i++) {
    const charCode = Math.floor(Math.random() * (0x9FA5 - 0x4E00)) + 0x4E00
    text += String.fromCharCode(charCode)
  }
  return text
}

