import React, { useState, useEffect } from "react";
import "./StaffList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  Button,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import AddNewStaff from "../../../components/AddNewStaff/AddNewStaff/AddNewStaff";
import EditStaff from "../../../components/EditStaff/EditStaff";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function StaffList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const deleteStaff = (id) => {
    console.log("delete staff:", id);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const operationButton = (item) => (
    <div className="button">
      <button
        className="trash"
        onClick={() => {
          handleOpenModal(item.firstname);
        }}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <button
        className="btn"
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        <FontAwesomeIcon icon={faPenToSquare} />
      </button>
    </div>
  );
  const stafflist = [
    {
      id: 1,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales Manager",
    },
    {
      id: 2,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
    {
      id: 3,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
    {
      id: 4,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
    {
      id: 5,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
    {
      id: 6,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
    {
      id: 7,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
    {
      id: 8,
      lastname: "Nguyen Minh",
      firstname: "Hung",
      email: "minhhung@gmail.com",
      phone: "0383069904",
      position: "Sales",
    },
  ];
  const totalpage = Math.ceil(stafflist.length / rowsPerPage);

  //delete staff
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const handleOpenModal = (id) => {
    setIdDelete(id);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="StaffList-container">
        <h2 className="title">Staff List</h2>
        <div className="add">
          <AddNewStaff />
        </div>
        <div className="table-product">
          <Box
            width="100%"
            overflow="auto"
            backgroundColor="white"
            paddingLeft={2}
            minHeight={490}
          >
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    className="table-label "
                    sx={{ minWidth: 100 }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 80 }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 120 }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 120 }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    align="left"
                    className="table-label"
                    sx={{ minWidth: 120 }}
                  >
                    Position
                  </TableCell>
                  <TableCell align="center" className="table-label"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stafflist
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        className="table-label "
                        sx={{ maxWidth: 80 }}
                      >
                        {item.lastname}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="table-label"
                        sx={{ maxWidth: 50 }}
                      >
                        {item.firstname}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="cell-content"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.email}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="cell-content"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.phone}
                      </TableCell>
                      <TableCell
                        align="left"
                        className="cell-content"
                        sx={{ maxWidth: 100 }}
                      >
                        {item.position}
                      </TableCell>
                      <TableCell align="center">
                        {operationButton(item)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </StyledTable>

            {/* <TablePagination
              className="table-pagination"
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={stafflist.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              // nextIconButtonProps={{ "aria-label": "Next Page" }}
              // backIconButtonProps={{ "aria-label": "Previous Page" }}
              sx={{
                marginTop: "2%",
                height: "70px",
                ".MuiInputBase-root": {
                  marginTop: "-1.5%",
                },
              }}
            /> */}
          </Box>
          <div className="pages">
            <div className="pages-number">1-5 of {page + 1}</div>
            <button
              className="button-back"
              onClick={() => handleChangePage(page - 1)}
              disabled={page == 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="icon-back" />
            </button>
            <button
              className="button-next"
              onClick={() => handleChangePage(page + 1)}
              disabled={page == totalpage - 1}
            >
              <FontAwesomeIcon icon={faChevronRight} className="icon-next" />
            </button>
          </div>
        </div>
      </div>
      <EditStaff openEdit={openEdit} setOpenEdit={setOpenEdit} />
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
            Delete Product
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Do you want to delete staff {idDelete} ?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: "5%" }}
          >
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteStaff(idDelete);
                handleClose();
              }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default StaffList;