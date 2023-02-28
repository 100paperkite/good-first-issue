#!/bin/bash

APP_DIR=/home/ec2-user/gfi/
APP_LOG_PATH=$APP_DIR/app.log
APP_ERR_LOG_PATH=$APP_DIR/app_error.log
JAR_DIR=$APP_DIR/build/
JAR_PATH=$(find $JAR_DIR -name '*.jar')

# 앱 경로로 이동해야 함. 기본 경로는 `/`
cd $APP_DIR

# load env
if [ -f .env ]
then
  export $(cat .env | xargs)
else
    echo ".env doesn't exist"
    exit 1
fi

# 돌아가고 있는 서버가 있는 지 확인
APP_PID=$(pgrep -f "gfi.*\.jar")
if [ -n "$APP_PID" ]; then
    echo "Killed old server $APP_PID"
    kill $APP_PID
fi

echo "Starting the server"
nohup java -jar $JAR_PATH > $APP_LOG_PATH 2> $APP_ERR_LOG_PATH &