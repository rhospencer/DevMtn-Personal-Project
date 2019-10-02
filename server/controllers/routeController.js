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
    }
}