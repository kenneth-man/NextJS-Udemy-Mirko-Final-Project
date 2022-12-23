export interface IProductProps {
	id: number;
	title: string;
	description: string;
}

export interface IHomePageProps {
	products: IProductProps[];
}