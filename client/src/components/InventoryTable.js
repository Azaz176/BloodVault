import React from "react";
import { GetInventoryWithFilters } from "../apicalls/inventory";
import { useDispatch } from "react-redux";
import { getDateFormat } from "../utils/helpers";
import { SetLoading } from "../redux/loadersSlice";
import { message, Table } from "antd";

function InventoryTable({ filters, userType, limit }) {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity (ml)",
      dataIndex: "quantity",
      render: (text) => text + " ml",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) =>record.organization.organizationName
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters, limit);
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

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={data} className="mt-3" />
    </div>
  );
}

export default InventoryTable;
