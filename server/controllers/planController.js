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
  }
};
