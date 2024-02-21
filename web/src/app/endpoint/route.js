import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; // defaults to auto
import axios from "axios";

export async function POST(request) {
	const { url: itemUrl } = await request.json();

	// let res = await axios.post(
	// 	"localhost:3000/api/scrape?url=https://www.amazon.in/Colgate-Toothpaste-Visible-White-Sparkling/product-reviews/B00I6F64T2/"
	// );

	// // const FormData = require("form-data");
	// console.log(itemUrl);
	var formdata = new FormData();
	formdata.append("url", itemUrl.replace("/dp/", "/product-reviews/"));

	let res = await axios
		.post("http://localhost:3000/api/scrape", formdata)
		.then((e) => {
			console.log(e.data);
			return e.data;
		});

	// var requestOptions = {
	// 	method: "POST",
	// 	body: formdata,
	// };

	// var res = await fetch("localhost:3000/api/scrape", requestOptions)
	// 	.then((response) => console.log(response))
	// 	// .then((result) => console.log(result))
	// 	.catch((error) => console.log("error", error));

	// console.log(res);

	return new Response(JSON.stringify(res), {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});

	// return new Response.json(res, {
	// 	status: 200,
	// 	headers: {
	// 		"Access-Control-Allow-Origin": "*",
	// 		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	// 		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	// 	},
	// });
}
