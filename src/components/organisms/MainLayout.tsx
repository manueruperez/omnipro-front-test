import { Layout, Grid } from "antd";
import Navbar from "#molecules/navBar/NabVar.tsx";
import Sidebar from "#molecules/sideBar/SideBar.tsx";
import DrawerMenu from "#molecules/drawerMenu/DrawerMenu.tsx";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const { Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint();

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Projectos", route: "/projects" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar onMenuClick={() => setDrawerVisible(true)} />
      <Layout>
        {screens.md && (
          <Sidebar
            menuItems={menuItems}
            collapsed={collapsed}
            onCollapse={setCollapsed}
          />
        )}
        {!screens.md && (
          <DrawerMenu
            menuItems={menuItems}
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
          />
        )}

        <Layout
          className="flex flex-col items-center"
          style={{ padding: "16px" }}
        >
          <Content
            style={{
              padding: 24,
              minHeight: 280,
              width: "100%",
              maxWidth: 1080,
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} Task Project Manager
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
