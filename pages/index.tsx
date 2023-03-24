import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/Date';
import { GetStaticProps } from 'next';
import { IPost } from '../types';
import Image from 'next/image';

type HomeProps = {
	allPostsData: IPost[];
};

export default function Home({ allPostsData }: HomeProps) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					Hello, I'm <strong>William</strong>. I'm a software enginer and I'm
					learning Next.js
				</p>
				<p>
					(This is a sample website - you’ll be building a site like this on{' '}
					<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
				</p>
			</section>
			<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`/posts/${id}`}>{title}</Link>
							<br />
							<small>
								<Date dateString={date} />
							</small>
						</li>
					))}
				</ul>
			</section>
			<Image
				src="https://nextjs.org/static/images/learn/data-fetching/pre-rendering.png"
				alt="Picture of Next"
				width={500}
				height={500}
			/>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = () => {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
};
