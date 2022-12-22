import Head from 'next/head';

const HomePage = (): JSX.Element => {
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
				<p>
					TODO
				</p>
			</main>
		</>
	)
}

export default HomePage;
