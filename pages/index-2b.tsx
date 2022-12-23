// Option 2b: fetch products on the client side with 'useEffect'
// from an interanl API route
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { IProductProps } from '../models/interfaces';

const HomePage = (): JSX.Element => {
	const [products, setProducts]: [IProductProps[], (arg: IProductProps[]) => void] = useState<IProductProps[]>([]);

	useEffect(() => {
		(async() => {
			const response: Response = await fetch('/api/products');
			const data: IProductProps[] = await response.json();
			setProducts(data);
		})();
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
						products.map((curr: IProductProps) => (
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
