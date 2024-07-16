

## Creating the database file

Requirements:
- `sqlite3` installed in your machine

Steps:

1. Set mode to csv to tell the command-line program to interpret file as a csv file.
```
sqlite> .mode csv
```

2. Import the file into sqlite3 to create
```
sqlite> .import ./staff-id-to-team-mapping-long.csv staff
```

```
sqlite> .import ./redeemed.csv redemption
```

3. Export the file
```
sqlite> .backup main christmas.db
```


## Assumptions

1. The csv files will not be changed.