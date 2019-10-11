UPDATE plans
SET 
    start_date = $2,
    end_date = $3,
    m_distance = $4,
    m_type = $5,
    tu_distance = $6,
    tu_type = $7,
    w_distance = $8,
    w_type = $9,
    th_distance = $10,
    th_type = $11,
    f_distance = $12,
    f_type = $13,
    sa_distance = $14,
    sa_type = $15,
    su_distance = $16,
    su_type = $17,
    week_focus = $18

WHERE plan_id = $1;