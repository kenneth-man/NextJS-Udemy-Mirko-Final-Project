import { IProductProps } from '../models/interfaces';

const stripProduct = (product: any) => {
	const { id, title }: IProductProps = product;

	return {
		id,
		title
	}
}

export const getProducts = async (): Promise<IProductProps[]> => {
	const response: Response = await fetch('http://localhost:1337/products');
	const data: any[] = await response.json();
	return data.map(stripProduct);
}
