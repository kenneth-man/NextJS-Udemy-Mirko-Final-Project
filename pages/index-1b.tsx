// Option 1b: fetch products on the server side with Incremental Static Regeneration ISR
// and with 'getStaticProps' and pre rendering
import { HeadTag } from '../components';
import { GetStaticPropsResult } from 'next';
import { getProducts } from '../lib/products';
import { IProductProps, IHomePageProps } from '../models/interfaces';

export const getStaticProps = async (): Promise<GetStaticPropsResult<IHomePageProps>> => {
	const products: IProductProps[] = await getProducts();

	return {
		props: {
			products
		},
		revalidate: 300 // in production, fetches new data every 5 minutes
	}
}

const HomePage = ({ products }: IHomePageProps): JSX.Element => {
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
