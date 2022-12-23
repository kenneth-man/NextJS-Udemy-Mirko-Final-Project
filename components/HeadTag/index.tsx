import Head from 'next/head';
import { IHeadTagProps } from './IHeadTagProps';

const HeadTag = ({
	title, name, content
}: IHeadTagProps): JSX.Element => (
	<Head>
		<title>{title}</title>
		<link
			rel="icon"
			href="/favicon.ico"
		/>
		<meta
			name={name}
			content={content}
		/>
	</Head>
)

export default HeadTag;
