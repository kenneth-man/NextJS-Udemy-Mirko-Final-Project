import { IProductProps } from '../models/interfaces';

const stripProduct = (product: any): IProductProps => {
	const { id, title, description }: IProductProps = product;

	return {
		id,
		title,
		description
	}
}

export const getProducts = async (): Promise<IProductProps[]> => {
	const response: Response = await fetch('http://localhost:1337/products');
	const data: any[] = await response.json();
	return data.map(stripProduct);
}

export const getProduct = async (id: number): Promise<IProductProps> => {
	const response: Response = await fetch(`http://localhost:1337/products/${id}`);
	return await response.json();
}
