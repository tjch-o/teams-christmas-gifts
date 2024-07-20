CREATE TABLE IF NOT EXISTS staff (
    staff_pass_id VARCHAR(256) PRIMARY KEY,
    team_name TEXT,
    created_at BIGINT
);

CREATE TABLE IF NOT EXISTS temp_redemption_2 (
    redeemed_id INTEGER,
    staff_pass_id TEXT,
    team_name TEXT,
    redeemed_at TEXT
);

CREATE TABLE IF NOT EXISTS redemption (
    redeemed_id INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_pass_id VARCHAR(256),
    team_name TEXT,
    redeemed_at BIGINT,
    FOREIGN KEY (staff_pass_id) REFERENCES staff(staff_pass_id)
);

INSERT INTO temp_redemption_2(redeemed_id, staff_pass_id, team_name, redeemed_at)
SELECT CAST(redeemed_id AS INTEGER), staff_pass_id, team_name, redeemed_at
FROM temp_redemption;

INSERT OR REPLACE INTO staff (staff_pass_id, team_name, created_at)
SELECT staff_pass_id, team_name, CAST(created_at AS INTEGER)
FROM temp_staff;

INSERT INTO redemption (staff_pass_id, team_name, redeemed_at)
SELECT staff_pass_id, team_name, CAST(redeemed_at AS INTEGER)
FROM temp_redemption_2;

DROP TABLE temp_staff;
DROP TABLE temp_redemption;
DROP TABLE temp_redemption_2;