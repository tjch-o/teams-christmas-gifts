CREATE TABLE IF NOT EXISTS staff (
    staff_pass_id VARCHAR(256) PRIMARY KEY,
    team_name TEXT,
    created_at BIGINT
);

CREATE TABLE IF NOT EXISTS redemption (
    redeemed_id INT SERIAL PRIMARY KEY,
    staff_pass_id VARCHAR(256),
    team_name TEXT,
    redeemed_at BIGINT,
    FOREIGN KEY (staff_pass_id) REFERENCES staff(staff_pass_id)
);

INSERT INTO staff (staff_pass_id, team_name, created_at)
SELECT staff_pass_id, team_name, CAST(created_at AS INT)
FROM temp_staff;

INSERT INTO redemption (redeemed_id, staff_pass_id, team_name, redeemed_at)
SELECT CAST(redeemed_id AS INT), staff_pass_id, team_name, CAST(redeemed_at AS INT)
FROM temp_redemption;

DROP TABLE temp_staff;
DROP TABLE temp_redemption;