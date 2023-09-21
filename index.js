const Express = require("express");
const cors = require("cors");
const body_parser = require("body-parser");
const helmet = require('helmet');
const morgan = require('morgan');

const sequelize = require("./database/mysql");

const user_routes = require("./router/user");
const login_routes = require("./router/login");
const expense_routes = require("./router/expense");
const order_routes = require("./router/order");
const leaderboard_routes = require("./router/leaderboard");


const User = require("./models/user");
const Order = require("./models/order");
const Expense = require("./models/expense");


const app = Express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use(body_parser.json({ extended: false }));
app.use(user_routes);
app.use(login_routes);
app.use(expense_routes);
app.use(order_routes);
app.use(leaderboard_routes);


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);



sequelize
    .sync()
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));