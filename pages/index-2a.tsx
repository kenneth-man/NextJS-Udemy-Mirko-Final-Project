// Option 2a: fetch products on the client side with 'useEffect'
// directly from an external API
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getProducts } from '../lib/products';
import { IProductProps } from '../models/interfaces';

const HomePage = (): JSX.Element => {
	const [products, setProducts]: [IProductProps[], (arg: IProductProps[]) => void] = useState<IProductProps[]>([]);

	const updateProducts = async (): Promise<void> => {
		const productsToUpdate: IProductProps[] = await getProducts();
		setProducts(productsToUpdate);
	}

	useEffect(() => {
		updateProducts();
	}, []);

	return (
		<>
			<Head>
				<title>Next Shop</title>
			</Head>
			<main
				className='p-4 space-y-4'
			>
				<h1
					className='text-2xl'
				>
					Next Shop
				</h1>
				<ul>
					{
						products.map((curr) => (
							<li
								key={curr.id}
							>
								{curr.title}
							</li>
						))
					}
				</ul>
			</main>
		</>
	)
}

export default HomePage;
