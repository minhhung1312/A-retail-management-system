import React, { useEffect, useState } from "react";
import "./AddProductCatalog.scss";
import {
  Box,
  Checkbox,
  FormHelperText,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Stack,
  styled,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddProductCatalog = ({ open, handleClose, id }) => {
  const product = [
    {
      id: 1,
      name: "Ao thun",
      price: 333,
      quantity: 10,
    },
    {
      id: 2,
      name: "Ao thun",
      price: 333,
      quantity: 10,
    },
    {
      id: 3,
      name: "Ao thun",
      price: 333,
      quantity: 10,
    },
    {
      id: 4,
      name: "Ao thun",
      price: 333,
      quantity: 10, 
    },
  ];
  useEffect(()=>{
    const newArray=[]
    setIds(newArray)
  },[open])
  const [ids, setIds] = useState([]);
  const handleChangeCheck = (item) => {
    if (ids.includes(item.id)) {
      const updateIds = ids.filter((n) => n != item.id);
      setIds(updateIds);
    } else {
      setIds([...ids, item.id]);
    }
  };

  return (
    <div className="Addproductcatalog-container">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="Addproductcatalog-container">
          <div className="title">Add Product To Category</div>
          <div className="table">
            <div className="lable">
              <div className="name">
                <Checkbox
                  // value="checkedA"
                  // checked={state.checkedA}
                  // onChange={handleChange("checkedA")}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                Name
              </div>
              <div className="num-product ">Price</div>
              <div className="quantity ">Quantity</div>
            </div>
            <div className="content">
              {product.map((item) => (
                <>
                  <div className="row" key={item.id}>
                    <div className="name">
                      <Checkbox
                          checked={ids.includes(item.id)}
                          onChange={()=>{handleChangeCheck(item)}}
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                      {item.name}
                    </div>
                    <div className="num-product">{item.price}</div>
                    <div className="quantity">{item.quantity}</div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="btn-box">
            <button className="btn cancel">Cancel</button>
            <button className="btn save">Save change</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default AddProductCatalog;