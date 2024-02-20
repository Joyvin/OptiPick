import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request) {
	const { url: itemUrl } = await request.json();

	let res = await axios.post("http://localhost:3000/api/scrape", {
		url: itemUrl,
	});

	console.log(res);

	return new Response(res, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
