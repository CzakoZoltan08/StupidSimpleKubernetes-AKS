// load the .env config file into the process.env variable
require("dotenv-flow").config();

// imports
let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");
let helmet = require("helmet");
let routes = require("./routes/routes");
let logger = require("morgan");
let exceptionHandler = require("./middlewares/exception-handler");
let mongoose = require("mongoose");
const promMid = require("express-prometheus-middleware");

// create express server
var app = express();

// setup middlewares

app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    /**
     * Uncomenting the `authenticate` callback will make the `metricsPath` route
     * require authentication. This authentication callback can make a simple
     * basic auth test, or even query a remote server to validate access.
     * To access /metrics you could do:
     * curl -X GET user:password@localhost:9091/metrics
     */
    // authenticate: req => req.headers.authorization === 'Basic dXNlcjpwYXNzd29yZA==',
    /**
     * Uncommenting the `extraMasks` config will use the list of regexes to
     * reformat URL path names and replace the values found with a placeholder value
     */
    // extraMasks: [/..:..:..:..:..:../],
    /**
     * The prefix option will cause all metrics to have the given prefix.
     * E.g.: `app_prefix_http_requests_total`
     */
    // prefix: 'app_prefix_',
    /**
     * Can add custom labels with customLabels and transformLabels options
     */
    // customLabels: ['contentType'],
    // transformLabels(labels, req) {
    //   // eslint-disable-next-line no-param-reassign
    //   labels.contentType = req.headers['content-type'];
    // },
  })
);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use("/user-service", routes);
app.use(exceptionHandler);

// setup database connection
mongoose.Promise = global.Promise;
let mongoConnectionString =
  `${process.env.MONGO_DB_PREFIX}` +
  `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE_NAME}`;
console.log(mongoConnectionString);
mongoose
  .connect(mongoConnectionString, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB started.");
  })
  .catch((err) => {
    console.log(err);
    console.log("Mongodb connection failed.");
  });

// run server
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
