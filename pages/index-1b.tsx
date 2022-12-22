// Option 1b: fetch products on the server side with Incremental Static Regeneration ISR
// and with 'getStaticProps' and pre rendering
import Head from 'next/head';
import { getProducts } from '../lib/products';
import { IProductProps } from '../models/interfaces';

export const getStaticProps = async (): Promise<
	{
		props: { products: IProductProps[] },
		revalidate: number
	}
> => {
	const products: IProductProps[] = await getProducts();

	return {
		props: {
			products
		},
		revalidate: 300 // in production, fetches new data every 5 minutes
	}
}

const HomePage = ({ products }: {
	products: IProductProps[]
}): JSX.Element => {
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
