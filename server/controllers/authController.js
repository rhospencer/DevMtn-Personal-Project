const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password, city, state, zip, profile_pic} = req.body

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: {text: 'Username already in use.', type: 'warning'}})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userId = await db.add_user([username, city, state, zip, profile_pic])
        db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
            return res.sendStatus(503)
        })

        req.session.user = {username, userId: userId[0].user_id, profile_pic}
        req.session.loggedIn = true
        res.status(201).send({message: {text: 'Registered and Logged In!', type: 'success'}, user: req.session.user, loggedIn: req.session.loggedIn})
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body
        
        const user = await db.find_user(username)
        
        if (!user[0]) return res.status(200).send({message: {text: 'Username does not exist.', type: 'error'}})

        const result = bcrypt.compareSync(password, user[0].hash)

        if (!result) return res.status(200).send({message: {text: 'Incorrect Username or Password', type: 'error'}})
        req.session.user = {username, user_id: user[0].user_id, profile_pic: user[0].profile_pic}
        req.session.loggedIn = true
        res.status(200).send({message: {text: 'Logged In!', type: 'success'}, user: req.session.user, loggedIn: req.session.loggedIn})
    },

    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: {text: 'Logged Out!', type: 'success'}, loggedIn: false})
    },

    async getUserInfo(req, res) {
        // const db = req.app.get('db')
        // console.log(req.session)
        // const {user_id} = req.session.user
        // console.log(user_id)

        // const user = await db.get_user_info(user_id)
        // console.log(user)
        return res.status(200).send({user: req.session.user, loggedIn: req.session.loggedIn})
    }


}