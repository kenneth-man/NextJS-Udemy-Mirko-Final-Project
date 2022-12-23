// Option 2a: fetch products on the client side with 'useEffect'
// directly from an external API
import { HeadTag } from '../components';
import { useEffect, useState } from 'react';
import { getProducts } from '../lib/products';
import { IProductProps } from '../models/interfaces';

const HomePage = (): JSX.Element => {
	const [products, setProducts]: [IProductProps[], (arg: IProductProps[]) => void] = useState<IProductProps[]>([]);

	useEffect(() => {
		(async () => {
			const productsToUpdate: IProductProps[] = await getProducts();
			setProducts(productsToUpdate);
		})();
	}, []);

	return (
		<>
			<HeadTag
				title="Next Shop"
				name="description"
				content="This is the home page for Next Shop"
			/>
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
