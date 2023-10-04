import { NextResponse } from "next/server";

export async function POST(request: Request)
{
   console.log(request.body);

   const a = await request.json();
   console.log(a);

   return NextResponse.json(`Seu login é ${a.login}`);
}