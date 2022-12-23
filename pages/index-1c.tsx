// Option 1c: fetch products on the server side with 'getServerSideProps' and pre rendering
// in production, 'getServerSideProps' is called everytime this page is requested
import { HeadTag } from '../components';
import { getProducts } from '../lib/products';
import { IProductProps } from '../models/interfaces';

export const getServerSideProps = async (): Promise<
	{ props: { products: IProductProps[] }}
> => {
	const products: IProductProps[] = await getProducts();

	return {
		props: {
			products
		}
	}
}

const HomePage = ({ products }: {
	products: IProductProps[]
}): JSX.Element => {
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
