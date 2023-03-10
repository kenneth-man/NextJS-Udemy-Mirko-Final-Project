import {
	GetStaticPropsResult,
	GetStaticPathsResult,
	GetStaticProps,
	GetStaticPaths
} from 'next';
import { ApiError } from 'next/dist/server/api-utils';
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
// runs at build time
export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<IProductPageParams>> => {
	const products: IProductProps[] = await getProducts();
	const ids: string[] = products.map((curr: IProductProps) => String(curr.id));

	return {
		paths: ids.map((curr: string) => ({
			params: {
				id: curr
			}
		})),
		fallback: 'blocking'
	}
}

// runs at build time
export const getStaticProps: GetStaticProps = async ({ params }): Promise<GetStaticPropsResult<IProductPageProps>> => {
	try {
		const id: string | string[] | undefined = (params as ParsedUrlQuery).id;
		const product: IProductProps = await getProduct(Number(id));

		return {
			props: {
				product
			}
		}
	} catch(error: any) {
		if (error.status === 404) {
			// nextjs recognizes this object flag to show it's 404 page
			return {
				notFound: true
			}
		}

		throw error;
	}
}

const ProductPage = ({ product: { id, title, description }}: IProductPageProps): JSX.Element => (
	<>
		<HeadTag
			title="Product Page"
			name="description"
			content="This is the product page for an item in Next Shop"
		/>
		<main>
			<h1>
				<strong>{title}</strong> - [id_#{id}]
			</h1>
			<p>{description}</p>
		</main>
	</>
		
)

export default ProductPage;
