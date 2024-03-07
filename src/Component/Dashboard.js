import { Card } from "@mui/material";
import React from "react";
import Form from "react-bootstrap/Form";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { PieChart, Pie, Tooltip as RechartsTooltip, LabelList } from "recharts";

const data02 = [{ date: "Group A", value: 60 }];

function Dashboard() {
  return (
    <>
      <div className="row m-auto">
        <div className="container mt-3 ">
          <div className="row m-auto  mt-3">
            <div className="row m-auto">
              <p className="textbld f_20">Sales Activity</p>
            </div>
            <div className="col-md-6  m-auto">
              <Card className="me-3 border1  p-4 m-auto    ">
                <div className="row text-center">
                  <span className="col-md-4 m-auto ">
                    <img alt="" height={60} src="../Images/truct1.png" />
                  </span>

                  <div className="col-md-6 ">
                    <div className="row">
                      <h3 className="col-md-2 textbld">8</h3>
                      <div className="col-md-8"></div>
                    </div>
                    <span className="row   m-auto">Quantity to be packed</span>
                  </div>
                  <div className="col-md-2 m-auto">
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              </Card>
              <Card className="me-3 border1  p-4 m-auto mt-3   ">
                <div className="row text-center">
                  <span className="col-md-4 m-auto ">
                    <img alt="" height={60} src="../Images/truck.png" />
                  </span>
                  <div className="col-md-6  m-auto ">
                    <div className="row">
                      <h3 className="col-md-2 textbld">35</h3>
                      <div className="col-md-8"></div>
                    </div>
                    <span className="row   m-auto">Packages to be shipped</span>
                  </div>
                  <div className="col-md-2 m-auto">
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-md-6 m-auto ">
              <Card className="ms-3 border1  p-4 m-auto   ">
                <div className="row text-center">
                  <span className="col-md-4 m-auto ">
                    <img alt="" height={60} src="../Images/truck2.png" />
                  </span>

                  <div className="col-md-6  m-auto ">
                    <div className="row">
                      <h3 className="col-md-2 textbld">36</h3>
                      <div className="col-md-8"></div>
                    </div>
                    <span className="row   m-auto">
                      Packages to be delivered
                    </span>
                  </div>
                  <div className="col-md-2 m-auto">
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              </Card>
              <Card className="ms-3 border1  p-4 m-auto mt-3   ">
                <div className="row text-center">
                  <span className="col-md-4 m-auto ">
                    <img alt="" height={60} src="../Images/truck3.png" />
                  </span>

                  <div className="col-md-6  m-auto ">
                    <div className="row">
                      <h3 className="col-md-2 textbld">68</h3>
                      <div className="col-md-8"></div>
                    </div>
                    <span className="row   m-auto">
                      Quantity to be invoiced
                    </span>
                  </div>
                  <div className="col-md-2 m-auto">
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="row m-auto mt-4">
            <p className="textbld f_20 m-auto ">Sales Activity (In Quantity)</p>
          </div>
          <div className="row m-auto  ">
            <div className="col-md-6  m-auto">
              <Card className=" border1 row m-auto mb-3 p-4">
                <div className="col-md-5  m-auto   ">
                  <div className="row">
                    <div className="col-md-2 leftborder"></div>
                    <div className="col-md-9 ms-2 ">
                      <span className="row textbld fnt_15"> In Hand</span>
                      <p className="row textbld">23300</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-5  m-auto   ">
                  <div className="row">
                    <div className="col-md-2 leftborder"></div>
                    <div className="col-md-9 ms-2 ">
                      <span className="row textbld fnt_15">To Be Received</span>
                      <p className="row textbld">23300</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="row   border1 m-auto  p-2">
                <div className="row  m-auto  ">
                  <div className="col-md-6">
                    <p className="textbld">TOP SELLING ITEMS</p>
                  </div>
                  <div className="col-md-6 gclr textbld ">Active Items</div>
                </div>
                <div className="row m-auto ">
                  <div className="col-md-4 m-auto">
                    <img
                      className="product_img"
                      alt=""
                      width={60}
                      height={60}
                      src="../Images/cer2.avif"
                    />
                    <p className="product_name textbld mt-2 m-auto">
                      Teal 250 ml Ceramic{" "}
                    </p>
                    <p className="product_name textbld ">SKU : 0023</p>
                  </div>
                  <div className="col-md-4 m-auto">
                    <img
                      className="product_img"
                      alt=""
                      width={60}
                      height={60}
                      src="../Images/cer2.avif"
                    />
                    <p className="product_name textbld mt-2 m-auto">
                      Teal 250 ml Ceramic
                    </p>
                    <p className="product_name textbld ">SKU : 0023</p>
                  </div>
                  <div className="col-md-4 m-auto">
                    <img
                      className="product_img"
                      alt=""
                      width={60}
                      height={60}
                      src="../Images/cer2.avif"
                    />
                    <p className="product_name textbld mt-2 m-auto p-0">
                      Teal 250 ml Ceramic
                    </p>
                    <p className="product_name textbld ">SKU : 0023</p>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-md-6 m-auto pb-3">
              <Card className="row border1 m-auto p-2">
                <div className="col-md-5">
                  <p className="textbld f_20">Product Details </p>{" "}
                  <p className="textbld p-3" style={{ color: "red" }}>
                    Low Stock Items
                  </p>
                  <p className="textbld p-3">All Items Groups</p>
                  <p className="textbld p-3">All Items </p>
                </div>{" "}
                <div className="col-md-1">
                  <p className="mt-5 textbld  p-3" style={{ color: "red" }}>
                    30
                  </p>
                  <p className="textbld  p-3">98</p>
                  <p className="textbld  p-3" style={{ color: "green" }}>
                    1002
                  </p>
                </div>
                <div className="col-md-5">
                  <p className="gclr textbld f_20">Active Items</p>
                  <PieChart width={200} height={200}>
                    <Pie
                      dataKey="value"
                      data={data02}
                      innerRadius={35}
                      outerRadius={65}
                      fill="#ffcc00"
                    >
                      <LabelList value="items" position="center" />
                      <LabelList value="items" position="center" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
              </Card>
              <Card className="row border1 mt-3 m-auto p-2   ">
                <div className="col-md-6 m-auto    ">
                  <h4 className="row m-auto ">Total Sales </h4>
                </div>
                <div className="col-md-6  m-auto   ">
                  <div className="row  m-auto">
                    <Form.Select className="row ">
                      <option>Daily</option> <option>Monthly</option>{" "}
                      <option>Yearly</option> <option>Weekly</option>{" "}
                    </Form.Select>
                    <h4 className="row textbld mt-2">Rs. 23300</h4>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
