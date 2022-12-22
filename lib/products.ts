import { IProductProps } from '../models/interfaces';

export const getProducts = async (): Promise<IProductProps[]> => {
	const response: Response = await fetch('http://localhost:1337/products');
	return await response.json();
}
