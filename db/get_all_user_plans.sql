SELECT * FROM plans
WHERE user_id = $1
ORDER by plan_id DESC;