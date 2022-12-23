import { fetchJson } from './api';
import { IProductProps } from '../models/interfaces';

// sometimes env variables are not being read; DotEnv would fix this https://www.npmjs.com/package/dotenv
const CMS_URL: string | undefined = process.env.CMS_URL ?? 'http://localhost:1337';

const stripProduct = (product: any): IProductProps => {
	const { id, title, description }: IProductProps = product;

	return {
		id,
		title,
		description
	}
}

export const getProducts = async (): Promise<IProductProps[]> => {
	const products: any = await fetchJson(`${CMS_URL}/products`);
	return products.map(stripProduct);
}

export const getProduct = async (id: number): Promise<IProductProps> => {
	const product: any = await fetchJson(`${CMS_URL}/products/${id}`);
	return stripProduct(product);
}
