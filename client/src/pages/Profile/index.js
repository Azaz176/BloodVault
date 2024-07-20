import React from "react";
import { useSelector } from "react-redux";
import { Tabs } from "antd";
import Inventory from "./Inventory";

function Profile() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs>
        {currentUser.userType === "organization" && (
          <>
            <Tabs.TabPane tab="Inventory" key="1">
                <Inventory/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Donors" key="2"></Tabs.TabPane>
            <Tabs.TabPane tab="Hospitals" key="3"></Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default Profile;
