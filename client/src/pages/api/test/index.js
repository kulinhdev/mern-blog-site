export default function handler(req, res) {
	if (req.method === "GET") {
		const bodyParams = req.query;
		res.status(200).json({
			message: `Test Url with params: ${JSON.stringify(bodyParams)}`,
		});
	} else {
		res.status(405).send({ message: "Method not allowed" });
	}
}
