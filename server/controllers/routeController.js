module.exports = {
    async getAllRoutes(req, res) {
        const db = req.app.get('db')
        const {city, distance} = req.query

        if (!city && !distance) {
            const routes = await db.get_all_routes()
            return res.status(200).send(routes)
        } else if (city && !distance) {
            const routes = await db.get_routes_by_city(`%${city}%`)
            return res.status(200).send(routes) 
        } else if (!city && distance) {
            const routes = await db.get_routes_by_distance(distance)
            return res.status(200).send(routes)
        } else {
            const routes = await db.get_routes_by_zip_and_distance([`%${city}%`, distance])
            return res.status(200).send(routes)
        }
    },

    async getSavedRoutes(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {user_routes, city, distance} = req.query
        if (user_routes !== 'true') {
            if (!city && !distance) {
                const routes = await db.get_all_saved_routes(user_id)
                return res.status(200).send(routes)
            } else if (city && !distance){
                const routes = await db.get_saved_routes_by_city(user_id, `%${city}%`)
                return res.status(200).send(routes)
            } else if (!city && distance) {
                const routes = await db.get_saved_routes_by_distance(user_id, distance)
                return res.status(200).send(routes)
            } else {
                const routes = await db.get_saved_routes_by_city_and_distance([user_id, `%${city}%`, distance])
                return res.status(200).send(routes)
            }
        } else {
            if (!city && !distance) {
                const routes = await db.get_all_user_routes(user_id)
                return res.status(200).send(routes)
            } else if (city && !distance){
                const routes = await db.get_user_routes_by_city(user_id, `%${city}%`)
                return res.status(200).send(routes)
            } else if (!city && distance) {
                const routes = await db.get_user_routes_by_distance(user_id, distance)
                return res.status(200).send(routes)
            } else {
                const routes = await db.get_user_routes_by_city_and_distance([user_id, `%${city}%`, distance])
                return res.status(200).send(routes)
            }
        }
    },

    async getSingleRoute(req, res) {
        db = req.app.get('db')
        const {route_id} = req.params
        const route = await db.get_single_route(route_id)
        res.status(200).send(route[0])
    },

    async addNewRoute(req, res) {
        db = req.app.get('db')
        const {user_id} = req.session.user
        const {route_img, zip, city, state, starting_address, distance, title} = req.body

        const route_id = await db.add_to_routes([user_id, route_img, zip, city, state, starting_address, distance, title])
        db.add_to_user_routes([route_id, user_id]).catch(err => {
            res.sendStatus(503)
        })
        res.status(200).send({message: 'New Route Added!'})


    }
}