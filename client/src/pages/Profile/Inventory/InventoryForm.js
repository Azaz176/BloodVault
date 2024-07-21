import React, { useState } from "react";
import { Form, Input, Modal, Radio, Select, message } from "antd";
import { getAndInputValidation } from "../../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loadersSlice";
import { AddInventory } from "../../../apicalls/inventory";

function InventoryForm({ open, setOpen, reloadData }) {
  const {currentUser}= useSelector(state=>state.users)
  const [form] = Form.useForm();
  const [inventoryType, setInventoryType] = useState("in");
  const dispatch=useDispatch()
  const onFinish= async (values)=>{
    try {
        dispatch(SetLoading(true))
        const response= await AddInventory({
            ...values,
            inventoryType,
            organization:currentUser._id
        })
        dispatch(SetLoading(false))
        if(response.success){
            message.success("Inventory Added Successfully")
            setOpen(false)
        } else{
            throw new Error(response.message)
        }
    } catch (error) {
        message.error(error.message)
        dispatch(SetLoading(false))
    }
  }

  return (
    <Modal
      title="ADD INVENTORY"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      onOk={() => {
        form.submit();
      }}
    >
      <Form layout="vertical" className="flex flex-col gap-3" form={form} onFinish={onFinish}>
        <Form.Item label="Inventory Type">
          <Radio.Group
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <Radio value="in">In</Radio>
            <Radio value="out">Out</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={getAndInputValidation()}
        >
          <Select name="" id="">
            <option value="a+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="o+">O+</option>
            <option value="o-">O-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">AB-</option>
          </Select>
        </Form.Item>

        <Form.Item
          label={inventoryType === "in" ? "Donor Email" : "Hospital Email"}
          name="email"
          rules={getAndInputValidation()}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Quantity (ml)"
          name="quantity"
          rules={getAndInputValidation()}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default InventoryForm;
