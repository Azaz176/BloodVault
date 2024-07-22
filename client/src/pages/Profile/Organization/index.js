import React from "react";
import {
  GetAllOrganizationsOfDonor,
  GetAllOrganizationsOfHospital,
} from "../../../apicalls/users";
import { SetLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import { getDateFormat } from "../../../utils/helpers";

function Organizations({ userType }) {
  const [data, setData] = React.useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response =
        userType === "donor"
          ? await GetAllOrganizationsOfDonor()
          : await GetAllOrganizationsOfHospital();
      console.log(response);
      dispatch(SetLoading(false));
      
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
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
  ];

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Organizations;
