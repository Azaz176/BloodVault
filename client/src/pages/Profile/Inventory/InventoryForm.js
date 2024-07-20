import React from 'react'
import { Modal } from 'antd'
function InventoryForm({
    open, 
    setOpen,
    reloadData
}) {
  return (
    <Modal
    title="Add Inventory"
    open={open}
    onCancel={()=>setOpen(false)}
    centered
    >

    </Modal>
  )
}

export default InventoryForm