// 'on-demand revalidation - detecting if any changes in CMS; if true, regenerate static html for pages
// strapi automatically passes in req, res objects
import { NextApiRequest, NextApiResponse } from 'next';
const handleRevalidate = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const event: any = req.body;

	if (event.model === 'product') {
		const id: number = event.entry.id;
		
		// executing revalidation in parrallel; promise will resolve/reject when all promises in the array have resolved/rejected 
		await Promise.all([
			res.revalidate('/'),
			res.revalidate(`/products/${id}`)
		]);
	}
	
	res
		.status(204)
		.end();
}

export default handleRevalidate;
