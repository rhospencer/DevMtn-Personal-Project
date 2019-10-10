module.exports = {
    async getAllUserPlans(req, res) {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        const plans = await db.get_all_user_plans(user_id)
        res.status(200).send(plans)
    },

    async getSinglePlan(req, res) {
        const db = req.app.get('db')
        const {plan_id} = req.params

        const plan = await db.get_single_plan(plan_id)
        res.status(200).send(plan)
    }
}