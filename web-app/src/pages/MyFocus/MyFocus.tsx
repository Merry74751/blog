import React, {useEffect, useState} from "react";
import {currentUserInfo} from "@/pages";
import {Avatar, Button, List} from "antd";
import {UserFocusVo} from "@/type/user";
import {listUserFocusVo} from "@/api/userFocus";
import ProCard from "@ant-design/pro-card";
import {Link} from "umi";


const MyFocus: React.FC = () => {
	const user = currentUserInfo();
	const [focusList, setFocusList] = useState<UserFocusVo[]>([]);

	const getFocusList = async () => {
		const {data}: any = await listUserFocusVo(user?.userId);
		if (data?.status === 200) setFocusList(data?.list)
	};

	useEffect(() => {
		getFocusList();
	}, []);

	return (
		<ProCard>
			<ProCard colSpan={"20%"}/>
			<ProCard>
				<List itemLayout={"horizontal"} dataSource={focusList}
					  rowKey={item => item.focusId}
					  bordered
					  renderItem={item => (
						  <List.Item actions={[
							  <Link to={`/focus-detail/${item.userFocusId}`}>查看</Link>,
							  <Button danger type={"text"}>取消关注</Button>
						  ]}>
							  <List.Item.Meta avatar={<Avatar src={item?.focusUser?.icon}/>}
											  title={<span>{item?.focusUser?.username}</span>}
											  description={`关注时间: ${item.focusTime}`}
							  />
						  </List.Item>
					  )}
				/>
			</ProCard>
			<ProCard colSpan={"20%"}/>
		</ProCard>
	)
};

export default MyFocus;
