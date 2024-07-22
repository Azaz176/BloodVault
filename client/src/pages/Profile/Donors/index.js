import React from "react";
import { message, Table } from "antd";

import { useDispatch } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { GetAllDonorsOfanOrganization } from "../../../apicalls/users";
import { getDateFormat } from "../../../utils/helpers";

function Donors() {
  const [data, setData] = React.useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllDonorsOfanOrganization();
      dispatch(SetLoading(false));
      console.log(response);
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

  const columns=[
    {
        title:"Name",
        dataIndex:"name"
    },
    {
        title:"Email",
        dataIndex:"email"
    },
    {
        title:"Phone",
        dataIndex:"phone"
    },
    {
        title:"Created At",
        dataIndex: "createdAt",
        render:(text)=> getDateFormat(text)
    }
  ]
  React.useEffect(() => {
    getData();
  }, []);
  return <div>
    <Table columns={columns} dataSource={data}/>
  </div>;
}

export default Donors;
