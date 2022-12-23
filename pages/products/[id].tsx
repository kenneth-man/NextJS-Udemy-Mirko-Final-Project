import {
	GetStaticPropsResult,
	GetStaticPathsResult,
	GetStaticProps,
	GetStaticPaths
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { HeadTag } from '../../components';
import { getProducts, getProduct } from '../../lib/products';
import { IProductProps } from '../../models/interfaces';

interface IProductPageParams extends ParsedUrlQuery {
	id: string; // ParsedUrlQuery index type must be a string; 'string | string[] | undefined'
}

interface IProductPageProps {
	product: IProductProps;
}

// define the possible routes for this dynamic route '/products/:id'
export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<IProductPageParams>> => {
	const products: IProductProps[] = await getProducts();
	const ids: string[] = products.map((curr: IProductProps) => String(curr.id));

	return {
		paths: ids.map((curr: string) => ({
			params: {
				id: curr
			}
		})),
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<IProductPageProps>> => {
	const id: string | string[] | undefined = (params as ParsedUrlQuery).id;
	const product: IProductProps = await getProduct(Number(id));

	return {
		props: {
			product
		}
	}
}

const ProductPage = ({ product: { id, title }}: IProductPageProps): JSX.Element => (
	<>
		<HeadTag
			title="Product Page"
			name="description"
			content="This is the product page for an item in Next Shop"
		/>
		<main>
			<h1>{title}</h1>
			<p>{id}</p>
		</main>
	</>
		
)

export default ProductPage;
