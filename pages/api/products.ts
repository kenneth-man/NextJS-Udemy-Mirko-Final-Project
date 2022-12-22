// an api route; middleware for data fetching (allowing us to execute code before a request or response is received)
import { NextApiRequest, NextApiResponse } from 'next';
import { getProducts } from '../../lib/products';

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const products = await getProducts();
	
	res
		.status(200)
		.json(products);
}

export default handler;
