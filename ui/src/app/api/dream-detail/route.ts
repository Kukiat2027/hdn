import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  try {
    const { keyword } = await req.json();
    const { data } = await axios.post('https://c3f1-202-183-135-69.ngrok-free.app/langchain/search', { keyword });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      result: {
        answer: "ฝันเห็นงู ทำนายว่า จะได้รับการอุปถัมภ์จากผู้ใหญ่ หรือจะได้รับโชคลาภทางการเสี่ยงโชค  \nเลขนำโชค ได้แก่ 59, 56, 19, 569, 655, 685",
        luckyNumber: [59, 56, 19, 569, 655, 685]
      }
    });
  }
}