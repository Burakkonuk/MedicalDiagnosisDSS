import {LinkedinOutlined,TwitterOutlined,GithubOutlined} from '@ant-design/icons';

function AppFooter(){
    return <div className="appFooter">
            <b>Follow us on </b>
            <div className='iconContainer'>
                <LinkedinOutlined />
                <TwitterOutlined />
                <GithubOutlined />
            </div>
            
    </div>
}

export default AppFooter;