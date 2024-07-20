CREATE TABLE IF NOT EXISTS staff (
    staff_pass_id VARCHAR(256) PRIMARY KEY,
    team_name TEXT,
    created_at BIGINT
);

-- converts all the text fields in temp_redemption to integer fields
CREATE TABLE IF NOT EXISTS normalized_redemption (
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

INSERT INTO normalized_redemption(redeemed_id, staff_pass_id, team_name, redeemed_at)
SELECT CAST(redeemed_id AS INTEGER), staff_pass_id, team_name, redeemed_at
FROM temp_redemption;

INSERT OR REPLACE INTO staff (staff_pass_id, team_name, created_at)
SELECT staff_pass_id, team_name, CAST(created_at AS INTEGER)
FROM temp_staff;

-- auto increment the redeemed_id
INSERT INTO redemption (staff_pass_id, team_name, redeemed_at)
SELECT staff_pass_id, team_name, CAST(redeemed_at AS INTEGER)
FROM normalized_redemption;

DROP TABLE temp_staff;
DROP TABLE temp_redemption;
DROP TABLE normalized_redemption;