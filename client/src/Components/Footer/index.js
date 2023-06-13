import {
  LinkedinOutlined,
  TwitterOutlined,
  GithubOutlined,
} from "@ant-design/icons";

function AppFooter() {
  return (
    <div className="appFooter">
      <div>
        <b>Follow us on </b>
      </div>
      <div className="iconContainer">
        <p>Burak Konuk</p>
        <a
          style={{ color: "black" }}
          href="https://tr.linkedin.com/in/burakkkonuk"
        >
          <LinkedinOutlined />
        </a>
        <a style={{ color: "black" }} href="https://github.com/Burakkonuk">
          <GithubOutlined />
        </a>

        <div> || </div>
        <a
          style={{ color: "black" }}
          href="https://www.linkedin.com/in/ali-haydar-aslan/"
        >
          <LinkedinOutlined />
        </a>
        <a style={{ color: "black" }} href="https://github.com/alihaydaraslan">
          <GithubOutlined />
        </a>
        <p>Ali H. Aslan &nbsp;</p>
      </div>
    </div>
  );
}

export default AppFooter;
