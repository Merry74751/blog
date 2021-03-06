import service from "../util/request";


export function listPostVo()  {
	return service({
		url: "/post/listVo",
		method: "GET"
	})
}

export function getPostById(id: string | undefined) {
	return service({
		url: `/post/getById/${id}`,
		method: "GET"
	})
}

export function insertPost(post: Post) {
	return service({
		url: "/post/insert",
		method: "POST",
		data: post
	})
}

export function listTag() {
	return service({
		url: "/postTag/list",
		method: "GET"
	})
}

export function listSort() {
	return service({
		url: "/postSort/list",
		method: "GET"
	})
}

export function listPostVoBySortId(sortId: string) {
	return service({
		url: "/post/listVoBySortId",
		method: "GET",
		params: {
			sortId: sortId
		}
	})
}

export function listPostVoByTagId(tagId: string) {
	return service({
		url: "/post/listVoByTagId",
		method: "GET",
		params: {
			tagId: tagId
		}
	})
}

export function updatePostById(post: Post) {
	return service({
		url: "/post/updateById",
		method: "PUT",
		data: {
			...post
		}
	})
}

export function deletePostById(postId: string) {
	return service({
		url: `/post/deleteById/${postId}`,
		method: "DELETE"
	})
}

export function pagePostVo(startPage: number, pageSize: number) {
	return service({
		url: "/post/pagePostVo",
		method: "GET",
		params: {
			startPage: startPage,
			pageSize: pageSize
		}
	})
}

export function pagePostVoByQuery(query: any) {
	return service({
		url: "/post/pagePostVoByQuery",
		method: "POST",
		data: query
	})
}
