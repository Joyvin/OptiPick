import axios from "axios";

export async function POST(req, res) {
	res = await axios.post("http://localhost:3000/api/scrape");
	console.log(res);
	return new Response(res);
}
