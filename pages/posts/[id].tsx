import Head from 'next/head';
import React from 'react';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { IPost } from '../../types';


type PostProps = {
	postData: IPost
}

function Post({ postData }: PostProps) {
	return (
		<Layout home={false}>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={postData.date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
			</article>
		</Layout>
	);
}

export default Post;

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const postData = await getPostData(params.id);
	return {
		props: {
			postData,
		},
	};
}
export const getStaticPaths: GetStaticPaths = () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false,
	};
}