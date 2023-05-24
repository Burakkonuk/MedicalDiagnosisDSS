import {Menu} from "antd"
import {useNavigate} from 'react-router-dom'
function AppHeader(){
    const navigate = useNavigate()
    const onMenuClick = (item) =>{
        navigate(`/${item.key}`);
    }

    return <div className="appHeader">
    <Menu
    onClick={onMenuClick}
        mode="horizontal"
        items = {[
            {
                label: "Home",
                key: "home",
            },
            {
                label: "Profile",
                key: "profile",
            },
            {
                label: "Diagnose",
                key: "diagnose",
            }

        ]}
    
    
    
    
    
    />
    </div>
}

export default AppHeader;