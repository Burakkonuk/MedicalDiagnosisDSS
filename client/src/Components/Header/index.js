import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
function AppHeader() {
  const navigate = useNavigate();
  const onMenuClick = (item) => {
    if (item.key == "Logout") {
      localStorage.clear();
      navigate("/login");
    } else {
      navigate(`/${item.key}`);
    }
  };

  return (
    <div className="appHeader">
      <Menu
        onClick={onMenuClick}
        mode="horizontal"
        items={[
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
          },
          {
            label: "Logout",
            key: "Logout",
          },
        ]}
      />
    </div>
  );
}

export default AppHeader;
