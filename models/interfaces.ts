export interface IProductProps {
	id: number;
	title: string;
}

export interface IHomePageProps {
	products: IProductProps[];
}