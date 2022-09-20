kill -9 `lsof -i:7001 | grep "(LISTEN)" | awk "{print $2}"`
