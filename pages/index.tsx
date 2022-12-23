// using option 1b in 'index-1b.tsx'
import Head from 'next/head';
import Link from 'next/link';
import { HeadTag } from '../components';
import { GetStaticPropsResult } from 'next';
import { getProducts } from '../lib/products';
import { IProductProps, IHomePageProps } from '../models/interfaces';

export const getStaticProps = async (): Promise<GetStaticPropsResult<IHomePageProps>>=> {
	const products: IProductProps[] = await getProducts();

	return {
		props: {
			products
		},
		revalidate: 300
	}
}

const HomePage = ({ products }: IHomePageProps): JSX.Element => (
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
							<Link
								href={`/products/${curr.id}`}
							>
								{curr.title}
							</Link>
						</li>
					))
				}
			</ul>
		</main>
	</>
)

export default HomePage;
