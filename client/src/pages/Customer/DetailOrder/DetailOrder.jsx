import React, { useEffect, useState } from "react";
import "./DetailOrder.scss";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  Button,
  Typography,
  Modal,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Grid,
  Stack,
} from "@mui/material";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { api } from "../../../constant/constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { getPriceExpr } from "../../../utils/getPriceRepr";
import { imageDB } from "../../../firebase/firebaseConfig";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));
const paidTag = <div className="paidTag">Paid</div>;
const wayPaidTag = <div className="wayPaidTag">Wait Pay</div>;
const configStatus = (status) => {
  if (status) {
    let result = status.replace(/_/g, " ");
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
  }
};

const DetailOrderBusiness = () => {
  const [order, setOrder] = useState();
  const { tenantURL, id } = useParams();
  const customer = useSelector(
    (state) => state.authCustomer.login?.currentUser
  );
  const config = {
    headers: {
      Authorization: `Bearer ${customer?.accessToken}`,
    },
  };
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const getOrder = async () => {
    const order = await axios.get(`${api}order/customer/${id}`, config);
    console.log(order.data.data);
    setOrder(order.data.data[0]);
    if (order.data.data[0]?.is_refund == true) {
      setRequestImgEncode(order.data.data[0]?.refund_picture[0]);
      setReason(order.data.data[0]?.type_reason);
    }
  };
  const getTotalPrice = (deliveryFee = 0) =>
    getPriceExpr(
      order?.products.reduce((prev, curr) => {
        return prev + curr.unit_price * curr.quantity;
      }, deliveryFee)
    );
  useEffect(() => {
    getOrder();
  }, []);

  //get refund request
  const [showModal, setShowModal] = useState(false);
  const [requestImgEncode, setRequestImgEncode] = useState("");
  const [reason, setReason] = useState("");
  const uploadAvatar = async (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setRequestImgEncode(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  const handleClose = () => {
    if (order?.is_refund != true) {
      setRequestImgEncode("");
      setReason("");
    }

    setShowModal(false);
  };
  const sendRequest = async () => {
    let avatarUrl = "";
    if (requestImgEncode.length > 90) {
      const imgRef = ref(imageDB, `files/${v4()}`);
      const snapshot = await uploadString(imgRef, requestImgEncode, "data_url");
      avatarUrl = await getDownloadURL(snapshot.ref);
    }
    const request = {
      refund_picture: [avatarUrl],
      reason: reason,
    };
    const send = await axios.post(
      `${api}order/create-request/${id}`,
      request,
      config
    );
    if (send.data.success == true) {
      console.log(send);
      setOrder(send.data.data);
      handleClose();
    } else {
      console.log(send);
    }
  };
  const handleConfirm = async () => {
    const confirm = await axios.post(
      `${api}order/confirm-receipt`,
      { orderID: id },
      config
    );
    if (confirm.data.success == true) {
      setOrder(confirm.data.data);
      //close modal
    } else {
      //closeModel
    }
  };
  // const deleteOrder=async()=>{
  //   const Delete=await axios.delete(`${api}order/delete/${id}`,)
  //   console.log(Delete)
  // }
  return (
    <>
      <div className="detailordercustomer-container">
        <div className="header">
          <div className="title">Order Detail</div>
          {/* <div
              className="request"
              onClick={deleteOrder}
            >
              Delete
            </div> */}
          {/* order.shipping_status == "delivered" && */}
          {order?.typeOrder == "Website" ? (
            <div
              className="request"
              onClick={() => {
                setShowModal(true);
              }}
            >
              {order?.is_refund == true
                ? "View Redelivery Request"
                : "Create Redelivery Request"}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="detail-info">
          <div className="order-info">
            <div className="label-frame">
              <div className="content-label">
                <div className="order-id">Order ID: #{order?._id}</div>
                <div className="mini-label">
                  <div className="order-date">
                    Order Date:
                    {moment(order?.createdAt).format("D MMM, YYYY h:mm A")}
                  </div>
                  <div className="payment-status">
                    {order?.statusPayment == "Paid" ? paidTag : wayPaidTag}
                  </div>
                </div>
              </div>
              {order?.typeOrder == "Website" &&
              !order?.is_refund &&
              order?.shipping_status == "delivered" ? (
                <button className="confirm">Confirm receipt</button>
              ) : (
                <></>
              )}
              <button
                className="action"
                onClick={() => {
                  window.open(
                    `https://tracking.ghn.dev/?order_code=${order?.shippingCode}`,
                    "_blank	"
                  );
                }}
              >
                Order Tracking
              </button>
            </div>
            <div className="list-product">
              <Box
                width="100%"
                overflow="auto"
                backgroundColor="white"
                minHeight={450}
              >
                <StyledTable>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <TableCell align="left" className="product lable-product">
                        Product
                      </TableCell>
                      <TableCell
                        align="left"
                        className="quantity lable-product"
                      >
                        Quantity
                      </TableCell>
                      <TableCell align="left" className="amount lable-product">
                        Amounts
                      </TableCell>
                      <TableCell align="left" className="amount lable-product">
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => (
                        <TableRow key={index} className="order-body">
                          <TableCell align="left" className="product">
                            <div className="product-container">
                              <img
                                src={item?.product_img[0]}
                                alt=""
                                className="img"
                              />
                              <div className="name-frame">
                                <div className="name-product">
                                  {item.product_name}
                                </div>
                                <div className="sku">
                                  SKU:{item.product_sku}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            align="left"
                            className="quantity content-order"
                            // sx={{ maxWidth: 140 }}
                          >
                            {item?.quantity}
                          </TableCell>
                          <TableCell
                            align="left"
                            className="amount content-order"
                          >
                            {item.unit_price * item?.quantity}đ
                          </TableCell>
                          <TableCell
                            align="left"
                            className="review content-order"
                          >
                            <Button
                              variant="contained"
                              onClick={() => {
                                navigate(
                                  `/${tenantURL}/customer/review/${item.product}`
                                );
                              }}
                              size="small"
                              disabled={!order?.is_confirm}
                            >
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </StyledTable>
              </Box>
            </div>
          </div>
          <div className="another-info">
            <div className="order-summary">
              <div className="summary-label">Order Summary</div>
              <Box
                width="100%"
                overflow="auto"
                backgroundColor="white"
                sx={{ marginBottom: 1 }}
              >
                <StyledTable>
                  <TableHead>
                    <TableRow
                      sx={{
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <TableCell
                        align="left"
                        className="description lable-product"
                      >
                        Descriptions
                      </TableCell>
                      <TableCell align="left" className="amount lable-product">
                        Amounts
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="order-body">
                      <TableCell align="left" className="description">
                        Sub Total :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {getTotalPrice()}đ
                      </TableCell>
                    </TableRow>
                    <TableRow className="order-body">
                      <TableCell align="left" className="description">
                        Discount :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {0}đ
                      </TableCell>
                    </TableRow>
                    <TableRow className="order-body">
                      <TableCell align="left" className="description">
                        Shipping Charge :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {getPriceExpr(Number(order?.shipPrice))}đ
                      </TableCell>
                    </TableRow>
                    <TableRow
                      className="order-body"
                      sx={{ borderBottom: 2, borderColor: "white" }}
                    >
                      <TableCell align="left" className="description">
                        Total Amount :
                      </TableCell>
                      <TableCell align="left" className="amount content-order">
                        {getTotalPrice(Number(order?.shipPrice))}đ
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </StyledTable>
              </Box>
            </div>
            <div className="ship-info">
              <div className="ship-label">Delivery Infomation</div>
              <div className="person-info">
                <div className="label">Name:</div> {order?.buyer_firstName}{" "}
                {order?.buyer_lastName}
              </div>
              <div className="phone-number">
                <div className="label"> Phone Number:</div>{" "}
                {order?.buyer_phoneNumber}
              </div>
              <div className="address">
                <div className="label">Address:</div>{" "}
                {order?.buyer_address_detail}
                {","}
                {order?.buyer_ward.split("//")[0]}
                {","}
                {order?.buyer_district.split("//")[0]}
                {","}
                {order?.buyer_province.split("//")[0]}
              </div>
              <div className="ship-status">
                <div className="label"> Shipping Status:</div>
                {configStatus(order?.shipping_status)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            sx={{ fontWeight: 600, fontSize: 30 }}
          >
            Request Re-delivery
          </Typography>
          {order?.is_refund == true ? (
            <div style={{ fontWeight: "550", display: "flex" }}>
              Request Status:
              <div
                style={{
                  color: `${
                    order?.refund_status == "Pending"
                      ? "#F7BF4D"
                      : order?.refund_status == "Reject"
                      ? "#C62828"
                      : "#67E87C"
                  }`,
                  marginLeft: "2%",
                }}
              >
                {order?.refund_status}
              </div>
            </div>
          ) : (
            <></>
          )}
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="title"
                style={{ fontWeight: 600, color: "gray" }}
                className="label"
              >
                Image Product Condition
              </InputLabel>
              <div
                className="avatar"
                style={{ display: "flex", justifyContent: "center" }}
              >
                {requestImgEncode.length > 1 ? (
                  <>
                    <img
                      src={requestImgEncode}
                      alt=""
                      style={{
                        width: "300px",
                        height: "200px",
                        border: "1px solid #ddd",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="input-avatar">
                      <label htmlFor="avatar">
                        <div
                          style={{
                            width: "300px",
                            height: "200px",
                            border: "1px dashed blue",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faUpload}
                            style={{
                              width: "200px",
                              height: "100px",
                            }}
                          />
                        </div>
                      </label>
                      <input
                        type="file"
                        name="image-business"
                        accept="image/*"
                        id="avatar"
                        hidden
                        onChange={uploadAvatar}
                      />
                    </div>
                  </>
                )}
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel
                htmlFor="title"
                style={{ fontWeight: 600, color: "gray" }}
              >
                Reason for request
              </InputLabel>
              <OutlinedInput
                placeholder="Please describe in detail the reason or problem with the products"
                multiline
                rows={5}
                sx={{ boxShadow: 3 }}
                value={reason}
                onChange={(event) => {
                  setReason(event.target.value);
                }}
              />
            </Stack>
          </Grid>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: "5%" }}
          >
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
            {order?.is_refund == true ? (
              <></>
            ) : (
              <Button
                variant="contained"
                disabled={!reason || !requestImgEncode}
                onClick={sendRequest}
              >
                Send Request
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default DetailOrderBusiness;
