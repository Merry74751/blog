import React, {useEffect, useState} from "react";
import {useParams} from "umi";
import {Input} from "antd";
import ProCard from "@ant-design/pro-card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {getPostById} from "@/api/post";

const {TextArea} = Input;

interface Param {
	id: string
}

const Code = {
	code({ node, inline, className, children, ...props }: any) {
		const match = /language-(\w+)/.exec(className || '');
		return !inline && match ? (
			<SyntaxHighlighter style={github} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
		) : (
			<code className={className} {...props} />
		)
	}
};

const Post = () => {
	const params = useParams<Param>();
	const [post, setPost] = useState<Post>({
		createTime: "",
		postContent: "",
		postId: "",
		postLikes: "",
		postTags: [],
		postTitle: "",
		postViews: "",
		sortId: "",
		status: "",
		titlePicture: "",
		updateTIme: "",
		userId: ""
	});
	const [loading, setLoading] = useState(false);

	const getPost = async () => {
		setLoading(true);
		const {data} = await getPostById(params.id);
		setPost(data.data);
		setLoading(false);
	};

	useEffect(() => {
		getPost();
	}, []);

	return (
		<ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
			<ProCard loading={loading}>
				<ReactMarkdown components={Code}
				children={post.postContent} remarkPlugins={[remarkGfm]}/>
				<TextArea showCount rows={8}/>
			</ProCard>
			<ProCard colSpan={{xs: "0%", sm: "0%", md: "10%", lg: "15%", xl: "20%"}}/>
		</ProCard>
	)
};

export default Post;
