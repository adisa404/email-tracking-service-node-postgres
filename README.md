# email-tracking-service-node-postgres

## how to test

URL: http://email-tracking.eu-central-1.elasticbeanstalk.com

for easier testing import the postman collection

1. generate the tracking url via the /generate api
2. send the email via the /sendEmail api
3. get pixel via the /pixel api
4. check for hits via the /hits api

## for local setup

1. rename the .env.example to .env and fill the variables accordingly
2. run migrations on the database with "npx prisma migrate dev"
3. run the node app with "npm run dev"
