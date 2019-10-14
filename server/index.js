require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const aws = require('aws-sdk')
const path = require('path')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env
const authCtrl = require('./controllers/authController')
const routeCtrl = require('./controllers/routeController')
const planCtrl = require('./controllers/planController')

const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET
}))
app.use( express.static( `${__dirname}/../build` ) )

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
app.post('/api/save/:route_id', routeCtrl.saveRoute)
app.delete('/api/delete/:route_id', routeCtrl.deleteRoute)
app.put('/api/edit_route/:route_id', routeCtrl.editRoute)

// PLAN ENDPOINTS
app.get('/api/plans', planCtrl.getAllUserPlans)
app.get('/api/plan/:plan_id', planCtrl.getSinglePlan)
app.post('/api/new_plan', planCtrl.addNewPlan)
app.delete(`/api/delete_plan/:plan_id`, planCtrl.deletePlan)
app.put('/api/edit_plan_route/:plan_id/:day_route/:route_id', planCtrl.editPlanRoute)
app.put('/api/edit_plan/:plan_id', planCtrl.editPlan)
app.put('/api/edit_plan_route_to_null/:plan_id/:day_route', planCtrl.editPlanRouteToNull)

// S3 ENDPOINTS
app.get('/api/signs3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
    const s3 = new aws.S3()
    const fileName = req.query['file-name']
    const fileType = req.query['file-type']
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
    }
    
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if (err) {
            console.log(err)
            return res.end()
        }
        const returnData = {
            signedRequest: data,
            url: `http://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        }
        return res.send(returnData)
    })
})

// HOSTING

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})



massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
})