import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic' // defaults to auto

export async function POST(request) {
    const { url: itemUrl } = await request.json();
    
    console.log('URL:', itemUrl);
  
    return new Response('Hello, Next.js!', {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    })
}

