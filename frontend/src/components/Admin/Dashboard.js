import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import MetaData from '../layout/MetaData'
import './Dashboard.css'
import Sidebar from './Sidebar'
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllProductsAdmin } from "../../actions/productAction";
import { useDispatch, useSelector } from 'react-redux'
import { adminViewAllOrders } from '../../actions/orderAction'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { adminViewAllUsers } from '../../actions/userAction'

const Dashboard = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        ArcElement,
        Title,
        Tooltip,
        Legend
    );
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.allProducts);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    
    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getAllProductsAdmin());
        dispatch(adminViewAllOrders());
        dispatch(adminViewAllUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders && orders.forEach((item) => {
        totalAmount += item.totalPrice;
    });


    const lineState = {
        labels: ["Initial Amount", "Revenue Generated"],
        datasets: [
            {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
            },
        ],
    };

        const doughnutState = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, products.length - outOfStock],
            },
        ],
    };

  return (
    <div className='dashboard'>
        <MetaData title="Admin Dashboard" />
        <Sidebar />
        <div className="dashboardContainer">
            <Typography component="h1">Dashboard</Typography>
            <div className="dashboardSummary">
                <div>
                    <p>Total Amount <br /> ₹{totalAmount}</p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Products</p>
                        <p>{products && products.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{orders && orders.length}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>
            <div className="lineChart">
                <Line data={lineState} />
            </div>
            <div className="doughnutChart">
                <Doughnut data={doughnutState} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard