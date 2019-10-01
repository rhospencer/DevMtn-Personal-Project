const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res) {
        const db = req.app.get('db')
        const {username, password, city, state, zip, profile_pic} = req.body

        const user = await db.find_username(username)
        if (user[0]) return res.status(200).send({message: 'Username already in use.'})

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const userId = await db.add_user([username, city, state, zip, profile_pic])
        db.add_hash({user_id: userId[0].user_id, hash}).catch(err => {
            return res.sendStatus(503)
        })

        req.session.user = {username, userId: userId[0].user_id}
        res.status(201).send({message: 'Registered and Logged In!', user: req.session.user, loggedIn: true})
    },

    async login(req, res) {
        const db = req.app.get('db')
        const {username, password} = req.body
        
        const user = await db.find_user(username)
        
        if (!user[0]) return res.status(200).send({message: 'Username does not exist.'})

        const result = bcrypt.compareSync(password, user[0].hash)

        if (!result) return res.status(200).send({message: 'Incorrect Password'})
        req.session.user = {username, user_id: user[0].user_id}
        res.status(200).send({message: 'Logged In!', user: req.session.user, loggedIn: true})
    },

    async logout(req, res) {
        req.session.destroy()
        res.status(200).send({message: 'Logged Out!', loggedIn: false})
    }
}