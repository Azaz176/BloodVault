import React from "react";
import {
  GetAllOrganizationsOfDonor,
  GetAllOrganizationsOfHospital,
} from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { message, Modal, Table } from "antd";
import { getDateFormat } from "../../../utils/helpers";
import InventoryTable from "../../../components/InventoryTable";

function Organizations({ userType }) {
  const [showHistoryModal, setShowHistoryModal] = React.useState(false);
  const { currentUser } = useSelector((state) => state.users);
  const [data, setData] = React.useState([]);
  const [selectedOrganization, setSelectedOrganization] = React.useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      //console.log("Fetching data for user type:", userType); // Log user type
      let response = null;
      if (userType === "hospital") {
        response = await GetAllOrganizationsOfHospital();
      } else {
        response = await GetAllOrganizationsOfDonor();
      }
      dispatch(SetLoading(false));

      if (response.success) {
       // console.log("API Dataaaa:", response.data); // Log response data
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          className="underline text-md cursor-pointer"
          onClick={() => {
            //console.log("Selected Organization:", record);
            setSelectedOrganization(record);
            setShowHistoryModal(true);
          }}
        >
          History
        </span>
      ),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} />

      {showHistoryModal && (
  <Modal
    title={`${
      userType === "donor" ? "Donations History" : "Consumptions History"
    } In ${selectedOrganization.organizationName}`}
    centered
    open={showHistoryModal}
    onCancel={() => setShowHistoryModal(false)}
    onOk={() => setShowHistoryModal(false)}
    width={1000}
  >
    <InventoryTable
      filters={{
        organization: selectedOrganization?._id,
        [userType]: currentUser._id,
      }}
    />
  </Modal>
)}

    </div>
  );
}

export default Organizations;
