import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <section className="shopping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2 className="text-center">Order History</h2>
          </div>
        </div>
        {loading ? (
          <div className="row mt-5">
            <div className="col-sm-12">
              <LoadingBox></LoadingBox>
            </div>
          </div>
        ) : error ? (
          <div className="row mt-5">
            <div className="col-sm-12">
              <MessageBox variant="danger">{error}</MessageBox>
            </div>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="col-lg-12">
              <div className="cart-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>
                          {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                        </td>
                        <td>
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : "No"}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-sm site-btn register-btn"
                            onClick={() => {
                              props.history.push(`/order/${order._id}`);
                            }}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
