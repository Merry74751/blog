import React, {useRef, useState} from "react";
import type {ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {pageUserByQuery, updateUserById} from "@/api/user";
import {Button, message, Modal, Popconfirm} from "antd";
import { ManOutlined, WomanOutlined } from "@ant-design/icons";
import Detail from "@/pages/user/Detail";

/**
 * 用户列表页
 * @constructor
 */
const UserList: React.FC = () => {
	const ref = useRef<any>();
	const [showUserDetail, setShowUserDetail] = useState(false);
	const [userId, setUserId] = useState("");

	const updateUser = async (user: any) => {
		const {status} = await updateUserById(user);
		if (status === 200) {
			message.success("操作成功!");
			ref?.current?.reload();
		}
	};

	const handleView = (user: User) => {
		setUserId(user.userId);
		setShowUserDetail(true);
	};

	const Columns: ProColumns<User>[] = [
		{
			title: "账号",
			dataIndex: "account",
			copyable: true
		},
		{
			title: "用户名",
			dataIndex: "username",
			copyable: true,
			ellipsis: true
		},
		{
			title: "手机号",
			dataIndex: "telephone",
			copyable: true,
		},
		{
			title: "性别",
			dataIndex: "sex",
			render: (dom, entity) => {
				if (entity.status) {
					return <span>女<WomanOutlined /></span>
				}
				return <span>男<ManOutlined /></span>
			}
		},
		{
			title: "粉丝数",
			dataIndex: "fans",
			valueType: "digit",
			search: false,
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			valueType: "dateTime",
			hideInSearch: true,
		},
		{
			title: "创建时间",
			dataIndex: "createTime",
			valueType: "dateTimeRange",
			hideInTable: true,
			colSize: 1.5,
			search: {
				transform: value => {
					return {
						startTime: value[0],
						endTime: value[1]
					}
				}
			}
		},
		{
			title: "状态",
			dataIndex: "status",
			valueEnum: {
				0: {text: "正常", status: "Success"},
				1: {text: "禁用", status: "Error"}
			}
		},
		{
			title: "操作",
			valueType: "option",
			fixed: "right",
			width: 250,
			render: (dom, entity) => [
				<Button type={"text"} onClick={() => handleView(entity)} style={{color: "#1890ff"}}>
					查看
				</Button>,
				<Button key={"1"}
						style={{borderRadius: 10}}
						type={"primary"}
						disabled={!entity.status}
						onClick={() => {
							updateUser({userId: entity.userId, status: 0})
						}}
				>
					恢复
				</Button>,
				<Popconfirm title={`是否禁用用户: ${entity.username} ?`} key={"2"} onConfirm={() => {
					updateUser({
						userId: entity.userId,
						status: 1
					})
				}}>
					<Button danger
							style={{borderRadius: 10}}
							disabled={entity.status}
					>
						禁用
					</Button>
				</Popconfirm>
			]
		}
	];

	const getUser = async (query: any) => {
		return pageUserByQuery({
			startPage: query?.current,
			...query
		})
	};

	return (
		<>
			<ProTable columns={Columns}
					  actionRef={ref}
					  scroll={{x: 1200}}
					  request={async (params) => {
						  const data: any = await getUser(params);
						  return {
							  data: data?.list,
							  total: data?.total,
							  success: data?.status === 200
						  }
					  }}
					  rowKey={"userId"}
			/>

			<Modal visible={showUserDetail} footer={null} destroyOnClose={true} onCancel={() => {
				setShowUserDetail(false);
				setUserId("");
			}}>
				<Detail userId={userId}/>
			</Modal>
		</>
	)
};

export default UserList;
