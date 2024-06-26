import React, { useEffect, useState } from "react";
import "./SaleInfor.scss";
import {
  Button,
  Card,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faLessThan,
  faGreaterThan,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function SaleInfor({ setTypeSale, setSaleInfor }) {
  const [numClass1, setNumClass1] = useState(0);
  const [numClass2, setNumClass2] = useState(0);
  const [class1s, setClass1] = useState([]);
  const [class2s, setClass2] = useState([]);
  const [saleInfo, setSaleInfo] = useState({
    color: { id: 0, name: "" },
    size: { id: 0, name: "" },
    buy: "",
    sell: "",
    quantity: "",
  });
  const [classSale, setClassSale] = useState([
    {
      color: { id: 0, name: "" },
      size: { id: 0, name: "" },
      buy: "",
      sell: "",
      quantity: "",
    },
  ]);
  const AddSingleInfo = (value, index) => {
    
    const newArray = saleInfo;
    if(index===0)
    {newArray.buy=value}
    if(index===1)
    {newArray.sell=value}
    if(index===1)
    {newArray.quantity=value}
    setSaleInfo(newArray);
  };
  const AddClass1 = (event, index) => {
    const newClassSale = classSale.map((item) => {
      if (item.color.id === index) {
        return { ...item, color: { id: index, name: event.target.value } };
      }
      return item;
    });
    setClassSale(newClassSale);

    const newArray = [...class1s];
    newArray[index] = event.target.value;
    setClass1(newArray);
  };
  const AddClass2 = (event, index) => {
    const newClassSale = classSale.map((item) => {
      if (item.size.id === index) {
        return { ...item, size: { id: index, name: event.target.value } };
      }
      return item;
    });
    setClassSale(newClassSale);

    const newArray = [...class2s];
    newArray[index] = event.target.value;
    setClass2(newArray);
  };
  const AddBuyPrice = (event, index1, index2) => {
    const newClassSale = classSale.map((item) => {
      if (item.color.id === index1 && item.size.id === index2) {
        return { ...item, buy: event.target.value };
      }
      return item;
    });
    setClassSale(newClassSale);
  };
  const AddSellPrice = (event, index1, index2) => {
    const newClassSale = classSale.map((item) => {
      if (item.color.id === index1 && item.size.id === index2) {
        return { ...item, sell: event.target.value };
      }
      return item;
    });
    setClassSale(newClassSale);
  };
  const AddQuantity = (event, index1, index2) => {
    const newClassSale = classSale.map((item) => {
      if (item.color.id === index1 && item.size.id === index2) {
        return { ...item, quantity: event.target.value };
      }
      return item;
    });
    setClassSale(newClassSale);
  };

  useEffect(() => {
    let arrayClass = [];
    let row = numClass1 > 0 ? numClass1 : 1;
    let col = numClass2 > 0 ? numClass2 : 1;
    if (numClass1 > 0 || numClass2 > 0) {
      for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
          const element = {
            color: { id: i, name: "" },
            size: { id: j, name: "" },
            buy: "",
            sell: "",
            quantity: "",
          };
          arrayClass.push(element);
        }
      }
    }
    setClassSale(arrayClass);
    const newClass1s = new Array(row).fill("");
    setClass1(newClass1s);
    const newClass2s = new Array(col).fill("");
    setClass2(newClass2s);
  }, [numClass1, numClass2]);
  useEffect(() => {
    if (numClass1 > 0 || numClass2 > 0) {
      setSaleInfor(classSale);
      setTypeSale(1);
    } else {
      setSaleInfor(saleInfo);
    }
  }, [classSale, saleInfo]);
  return (
    <div className="ClassInfor-container">
      <Paper
        style={{ marginTop: "3%", padding: "3% 3% 3% 2%", marginBottom: "4%" }}
      >
        <div className="title"> Sale Information</div>
        <div className="content">
          <div className="class">
            <InputLabel item htmlFor="title" className="title-small">
              Product categorization
            </InputLabel>
            <div className="add-product1">
              {numClass1 === 0 ? (
                <>
                  <button
                    onClick={() => {
                      setNumClass1(numClass1 + 1);
                      setClass1([...class1s, ""]);
                      AddSingleInfo("", 0);
                      AddSingleInfo("", 1);
                      AddSingleInfo("", 2);
                    }}
                    className="btn add"
                  >
                    Add Category Group 1
                  </button>
                </>
              ) : (
                <>
                  <div className="class1">
                    <div className="title-small"> Color</div>

                    <div className="class-box">
                      {class1s.map((class1, index) => (
                        <div className="info-box" key={index}>
                          <OutlinedInput
                            placeholder="Add color"
                            size="small"
                            style={{
                              width: "70%",
                              height: "auto",
                              marginRight: "8%",
                            }}
                            sx={{ boxShadow: 3 }}
                            value={
                              classSale.filter(
                                (item) => item.color.id === index
                              )[0]
                                ? classSale.filter(
                                    (item) => item.color.id === index
                                  )[0].color.name
                                : ""
                            }
                            onChange={(event) => AddClass1(event, index)}
                          />
                          <button className="btn">
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setNumClass1(numClass1 + 1);
                          setClass1([...class1s, ""]);
                        }}
                        className="btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="add-product1">
              {numClass2 === 0 ? (
                <>
                  <button
                    onClick={() => {
                      setNumClass2(numClass2 + 1);
                      setClass2([...class2s, ""]);
                      AddSingleInfo("", 0);
                      AddSingleInfo("", 1);
                      AddSingleInfo("", 2);
                    }}
                    className="btn add"
                  >
                    Add Category Group 2
                  </button>
                </>
              ) : (
                <>
                  <div className="class1">
                    <div className="title-small"> Size</div>
                    <div className="class-box">
                      {class2s.map((class2, index) => (
                        <div className="info-box" key={index}>
                          <OutlinedInput
                            placeholder="Add Size"
                            size="small"
                            style={{
                              width: "70%",
                              height: "auto",
                              marginRight: "8%",
                            }}
                            sx={{ boxShadow: 3 }}
                            value={
                              classSale.filter(
                                (item) => item.size.id === index
                              )[0]
                                ? classSale.filter(
                                    (item) => item.size.id === index
                                  )[0].size.name
                                : ""
                            }
                            onChange={(event) => AddClass2(event, index)}
                          />
                          <button className="btn">
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setNumClass2(numClass2 + 1);
                          setClass2([...class2s, ""]);
                        }}
                        className="btn"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="sale">
            {numClass1 === 0 && numClass2 === 0 ? (
              <>
                <div className="single">
                  <Grid container spacing={2} direction={"column"}>
                    <Grid container item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title" className="title-small">
                          Buy Price
                        </InputLabel>
                        <OutlinedInput
                          size="small"
                          sx={{
                            boxShadow: 3,
                          }}
                          onChange={(event) => {
                            AddSingleInfo(event.target.value, 0);
                          }}
                        />
                      </Stack>
                    </Grid>
                    <Grid container item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title" className="title-small">
                          Sell Price
                        </InputLabel>
                        <OutlinedInput
                          size="small"
                          sx={{
                            boxShadow: 3,
                          }}
                          onChange={(event) => {
                            AddSingleInfo(event.target.value, 1);
                          }}
                        />
                      </Stack>
                    </Grid>
                    <Grid container item xs={4}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="title" className="title-small">
                          Quantity
                        </InputLabel>
                        <OutlinedInput
                          size="small"
                          sx={{
                            boxShadow: 3,
                          }}
                          onChange={(event) => {
                            AddSingleInfo(event.target.value, 2);
                          }}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                </div>
              </>
            ) : (
              <>
                <div className="list-class">
                  <div className="title-small">List of product categories</div>
                  <div className="lable">
                    {numClass1 !== 0 ? (
                      <>
                        <div className="lable-mini border-start">Color</div>
                      </>
                    ) : (
                      <></>
                    )}
                    {numClass2 !== 0 ? (
                      <>
                        <div className="lable-mini">Size</div>
                      </>
                    ) : (
                      <></>
                    )}
                    <div className="lable-mini">Buy</div>
                    <div className="lable-mini">Sell</div>
                    <div className="lable-mini border-end">Quantity</div>
                  </div>
                  {numClass1 > 0 ? (
                    <>
                      {numClass2 > 0 ? (
                        <>
                          {/* ca hai */}
                          {class1s.map((class1, index1) => (
                            <>
                              <div className="option-1">
                                <div className="color-box1">
                                  <div className="">{class1}</div>
                                </div>
                                <div className="price-contaner1">
                                  {class2s.map((class2, index2) => (
                                    <>
                                      <div className="price-box1" key={index2}>
                                        <div className="size-box1">
                                          {class2}
                                        </div>
                                        <OutlinedInput
                                          size="small"
                                          className="buy-box1"
                                          value={
                                            classSale.filter(
                                              (item) =>
                                                item.color.id === index1 &&
                                                item.size.id === index2
                                            )[0]
                                              ? classSale.filter(
                                                  (item) =>
                                                    item.color.id === index1 &&
                                                    item.size.id === index2
                                                )[0].buy
                                              : ""
                                          }
                                          onChange={(event) => {
                                            AddBuyPrice(event, index1, index2);
                                          }}
                                        />
                                        <OutlinedInput
                                          size="small"
                                          className="sell-box1"
                                          value={
                                            classSale.filter(
                                              (item) =>
                                                item.color.id === index1 &&
                                                item.size.id === index2
                                            )[0]
                                              ? classSale.filter(
                                                  (item) =>
                                                    item.color.id === index1 &&
                                                    item.size.id === index2
                                                )[0].sell
                                              : ""
                                          }
                                          onChange={(event) => {
                                            AddSellPrice(event, index1, index2);
                                          }}
                                        />
                                        <OutlinedInput
                                          size="small"
                                          className="quantity-box1"
                                          value={
                                            classSale.filter(
                                              (item) =>
                                                item.color.id === index1 &&
                                                item.size.id === index2
                                            )[0]
                                              ? classSale.filter(
                                                  (item) =>
                                                    item.color.id === index1 &&
                                                    item.size.id === index2
                                                )[0].quantity
                                              : ""
                                          }
                                          onChange={(event) => {
                                            AddQuantity(event, index1, index2);
                                          }}
                                        />
                                      </div>
                                    </>
                                  ))}
                                </div>
                              </div>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {/* Chi 1*/}
                          {class1s.map((class1, index1) => (
                            <>
                              <div className="option-2" key={index1}>
                                <div className="attribute-box">
                                  <div className="">{class1}</div>
                                </div>

                                <OutlinedInput
                                  size="small"
                                  className="option2-box"
                                  value={
                                    classSale.filter(
                                      (item) =>
                                        item.color.id === index1 &&
                                        item.size.id === 0
                                    )[0]
                                      ? classSale.filter(
                                          (item) =>
                                            item.color.id === index1 &&
                                            item.size.id === 0
                                        )[0].buy
                                      : ""
                                  }
                                  onChange={(event) => {
                                    AddBuyPrice(event, index1, 0);
                                  }}
                                />

                                <OutlinedInput
                                  size="small"
                                  className="option2-box"
                                  value={
                                    classSale.filter(
                                      (item) =>
                                        item.color.id === index1 &&
                                        item.size.id === 0
                                    )[0]
                                      ? classSale.filter(
                                          (item) =>
                                            item.color.id === index1 &&
                                            item.size.id === 0
                                        )[0].sell
                                      : ""
                                  }
                                  onChange={(event) => {
                                    AddSellPrice(event, index1, 0);
                                  }}
                                />
                                <OutlinedInput
                                  size="small"
                                  className="option2-box"
                                  value={
                                    classSale.filter(
                                      (item) =>
                                        item.color.id === index1 &&
                                        item.size.id === 0
                                    )[0]
                                      ? classSale.filter(
                                          (item) =>
                                            item.color.id === index1 &&
                                            item.size.id === 0
                                        )[0].quantity
                                      : ""
                                  }
                                  onChange={(event) => {
                                    AddQuantity(event, index1, 0);
                                  }}
                                />
                              </div>
                            </>
                          ))}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {/* Chi 2*/}
                      {class2s.map((class2, index2) => (
                        <>
                          <div className="option-2" key={index2}>
                            <div className="attribute-box">
                              <div className="">{class2}</div>
                            </div>

                            <OutlinedInput
                              size="small"
                              className="option2-box"
                              value={
                                classSale.filter(
                                  (item) =>
                                    item.color.id === 0 &&
                                    item.size.id === index2
                                )[0]
                                  ? classSale.filter(
                                      (item) =>
                                        item.color.id === 0 &&
                                        item.size.id === index2
                                    )[0].buy
                                  : ""
                              }
                              onChange={(event) => {
                                AddBuyPrice(event, 0, index2);
                              }}
                            />

                            <OutlinedInput
                              size="small"
                              className="option2-box"
                              value={
                                classSale.filter(
                                  (item) =>
                                    item.color.id === 0 &&
                                    item.size.id === index2
                                )[0]
                                  ? classSale.filter(
                                      (item) =>
                                        item.color.id === 0 &&
                                        item.size.id === index2
                                    )[0].sell
                                  : ""
                              }
                              onChange={(event) => {
                                AddSellPrice(event, 0, index2);
                              }}
                            />
                            <OutlinedInput
                              size="small"
                              className="option2-box"
                              value={
                                classSale.filter(
                                  (item) =>
                                    item.color.id === 0 &&
                                    item.size.id === index2
                                )[0]
                                  ? classSale.filter(
                                      (item) =>
                                        item.color.id === 0 &&
                                        item.size.id === index2
                                    )[0].quantity
                                  : ""
                              }
                              onChange={(event) => {
                                AddQuantity(event, 0, index2);
                              }}
                            />
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </Paper>
      {/* <button
        onClick={() => {
          console.log(class1s);
          //AddSaleInfo();
        }}
      >
        +
      </button> */}
    </div>
  );
}

export default SaleInfor;
