import { NextResponse } from "next/server";

export async function GET(request: Request)
{
   return NextResponse.json(`LOGIN !!!`);
}

export async function POST(request: Request)
{
   return NextResponse.json(`CADASTRO !!!`);
}