import { Avatar, Divider } from 'antd'
import '../public/style/components/author.css'

const Author = () => {
    return (
        <div className="author-div common-box">
            <div><Avatar size={100} src="https://b-ssl.duitang.com/uploads/item/201804/05/20180405231344_snjko.jpg" /></div>
            <div className="author-introduction">
                不断学习，不断进步
                <Divider>社交帐号</Divider>
                <Avatar size={28} icon="github" className="account" />
                <Avatar size={28} icon="qq" className="account" />
                <Avatar size={28} icon="wechat" className="account" />
            </div>
        </div>
    )
}

export default Author