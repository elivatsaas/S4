const express = require('express');
const morgan = require('morgan');

const landingRouter = require('./routes/landingRoutes');
const employeeRouter = require('./routes/employeeRoutes');
const shiftRouter = require('./routes/shiftRoutes');
const scheduleRouter = require('./routes/scheduleRoutes');
const availabilityRouter = require('./routes/availabilityRoutes');
const dshRouter = require('./routes/dshRoutes');
const roleRouter = require('./routes/roleRoutes');
const storeRouter = require('./routes/storeRoutes');
const employeeRoleRouter = require('./routes/employeeRoleRoutes');
const employeeStoreRouter = require('./routes/employeeStoreRoutes');

const app = express();

//MIDDLEWARES
//middleware modifies incoming request data
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use('/.css', express.static(`${__dirname}/public/css`));

//ROUTES
app.use('/' || '/landing', landingRouter);
//app.use('/schedules', scheduleRouter);
app.use('/api/v1/employees', employeeRouter);
app.use('/api/v1/shifts', shiftRouter);
app.use('/api/v1/schedules', scheduleRouter);
app.use('/api/v1/availabilities', availabilityRouter);
app.use('/api/v1/dsh', dshRouter);
app.use('/api/v1/roles', roleRouter);
app.use('/api/v1/stores', storeRouter);
app.use('/api/v1/employeeroles', employeeRoleRouter);
app.use('/api/v1/employeestores', employeeStoreRouter);

module.exports = app;
