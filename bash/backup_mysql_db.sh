# $1 = source database name
# $2 = database username
# $3 = database password

/usr/bin/mysqldump $1 > "$PWD/../files/database.sql" -u $2 -p$3
