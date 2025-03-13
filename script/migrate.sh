#!/bin/bash

echo 'Starting Postgres...'
docker compose -f docker-compose.postgres.yml up -d

sleep 5

echo 'Migrating Prisma data model...'
npx prisma migrate dev --name init
# drop the development database
# npx prisma migrate reset 
# docker compose exec backend npm run reset

echo 'Complete'