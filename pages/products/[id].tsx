import {
	GetStaticPropsResult,
	GetStaticPathsResult,
	GetStaticProps,
	GetStaticPaths
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getProducts, getProduct } from '../../lib/products';
import { IProductProps } from '../../models/interfaces';

interface IProductPageParams extends ParsedUrlQuery {
	id: string; // ParsedUrlQuery index type required to be 'string | string[] | undefined'
}

interface IProductPageProps {
	product: IProductProps;
}

export const getStaticPaths: GetStaticPaths = async (): Promise<GetStaticPathsResult<IProductPageParams>> => {
	const products: IProductProps[] = await getProducts();
	const ids: string[] = products.map((curr) => String(curr.id));

	return {
		paths: ids.map((curr) => ({
			params: {
				id: curr
			} as IProductPageParams
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

const ProductPage = ({ product: { id, title }}: IProductPageProps): JSX.Element => {
	return (
		<main>
			<h1>{title}</h1>
			<p>{id}</p>
		</main>
	)
}

export default ProductPage;
