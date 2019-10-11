module.exports = {
  async getAllUserPlans(req, res) {
    const db = req.app.get("db");
    const { user_id } = req.session.user;

    const plans = await db.get_all_user_plans(user_id);
    res.status(200).send(plans);
  },

  async getSinglePlan(req, res) {
    const db = req.app.get("db");
    const { plan_id } = req.params;

    const plan = await db.get_single_plan(plan_id);
    res.status(200).send(plan);
  },

  async addNewPlan(req, res) {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const {
      start_date,
      end_date,
      week_focus,
      m_distance,
      m_type,
      m_description,
      m_route,
      tu_distance,
      tu_type,
      tu_description,
      tu_route,
      w_distance,
      w_type,
      w_description,
      w_route,
      th_distance,
      th_type,
      th_description,
      th_route,
      f_distance,
      f_type,
      f_description,
      f_route,
      sa_distance,
      sa_type,
      sa_description,
      sa_route,
      su_distance,
      su_type,
      su_description,
      su_route
    } = req.body;

    const newPlan = await db.add_new_plan([
      user_id,
      start_date,
      end_date,
      week_focus,
      m_distance,
      m_type,
      m_description,
      m_route,
      tu_distance,
      tu_type,
      tu_description,
      tu_route,
      w_distance,
      w_type,
      w_description,
      w_route,
      th_distance,
      th_type,
      th_description,
      th_route,
      f_distance,
      f_type,
      f_description,
      f_route,
      sa_distance,
      sa_type,
      sa_description,
      sa_route,
      su_distance,
      su_type,
      su_description,
      su_route
    ]);
    res
      .status(200)
      .send({ message: { text: "New plan added!", type: "success" } });
  },

  async deletePlan(req, res) {
    const db = req.app.get('db')
    const {plan_id} = req.params
    const deleted_plan = await db.delete_plan(plan_id)
    res.status(200).send({message: {text: 'Plan deleted!', type: 'success'}})
  },

  async editPlanRoute(req, res) {
    const db = req.app.get('db')
    const {plan_id, day_route, route_id} = req.params
    switch (day_route) {
      case 'm_route':
        await db.edit_m_route([plan_id, route_id])
        break
      case 'tu_route':
        await db.edit_tu_route([plan_id, route_id])
        break
      case 'w_route':
        console.log('its wednesday my dudes')
        await db.edit_w_route([plan_id, route_id])
        break
      case 'th_route':
        await db.edit_th_route([plan_id, route_id])
        break
      case 'f_route':
        await db.edit_f_route([plan_id, route_id])
        break
      case 'sa_route':
        await db.edit_sa_route([plan_id, route_id])
        break
      case 'su_route':
        await db.edit_su_route([plan_id, route_id])
        break
      default:
        res.status(200).send({message: {text: 'Choose day to edit.', type: 'error'}})
    }
    
    res.status(200).send({message: {text: 'Plan edited!', type: 'success'}})
  },

  async editPlan(req, res) {
    const  db = req.app.get('db')
    const {plan_id} = req.params
    const {
      start_date,
      end_date,
      m_distance,
      m_type,
      tu_distance,
      tu_type,
      w_distance,
      w_type,
      th_distance,
      th_type,
      f_distance,
      f_type,
      sa_distance,
      sa_type,
      su_distance,
      su_type,
      week_focus
    } = req.body

    await db.edit_plan([
      plan_id,
      start_date,
      end_date,
      m_distance,
      m_type,
      tu_distance,
      tu_type,
      w_distance,
      w_type,
      th_distance,
      th_type,
      f_distance,
      f_type,
      sa_distance,
      sa_type,
      su_distance,
      su_type,
      week_focus
    ])

    res.status(200).send({message: {text: 'Plan edited!', type: 'success'}})
  }
};
