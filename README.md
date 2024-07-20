This is a Govtech take home assignment.

## Creating the database file

Requirements:
- `sqlite3` installed in your machine

Steps:

1. Set mode to csv to tell the command-line program to interpret file as a csv file.
```
sqlite> .mode csv
```

2. Import the csv files into sqlite3 to create temporary tables.
```
sqlite> .import staff-id-to-team-mapping-long.csv temp_staff
```

```
sqlite> .import redeemed.csv temp_redemption
```

3. Import the sql file that will do data transformation and create tables.

```
sqlite> .read schema.sql
```


4. Export the file
```
sqlite> .backup main prisma/christmas.db
```


## Assumptions

1. The csv files will not be changed.