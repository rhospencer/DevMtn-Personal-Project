require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
const authCtrl = require('./controllers/authController')
const routeCtrl = require('./controllers/routeController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))

// AUTH ENDPOINTS
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)
app.get('/auth/me', authCtrl.getUserInfo)
// ROUTE ENDPOINTS
app.get('/api/routes', routeCtrl.getAllRoutes)
app.get('/api/saved_routes', routeCtrl.getSavedRoutes)
app.get('/api/route/:route_id', routeCtrl.getSingleRoute)
app.post('/api/new_route', routeCtrl.addNewRoute)

// PLAN ENDPOINTS



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})