const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Parse requests of content-type = [application/json]
app.use(bodyParser.json());

// Parse requests of content-type = [application/x-www-form-urlencoded]
app.use(bodyParser.urlencoded({extended: true}));

// Setup database
const db = require('./models');
const Options = db.options;
const Permission = db.permission;

const dbConfig = require('./config/db.config');
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        initial();
    })
    .catch(err => {
        console.error('Connection error', err);
        process.exit();
    });

function initial() {

    // Initialize Options
    Options.estimatedDocumentCount((err, count) => {
        if(!err && count === 0) {
            new Options().save(err => {
                if(err) {
                    console.log('Error initializing options', err);
                }

                console.log('Initialized options');
            });
        }
    });

    // Initialize Permissions
    Permission.estimatedDocumentCount((err, count) => {
        if(!err && count === 0){
            new Permission({
                name: 'user'
            }).save(err => {
                if(err){
                    console.log('error', err);
                }

                console.log("Added 'user' to permissions collection");
            });

            new Permission({
                name: 'moderator'
            }).save(err => {
                if(err){
                    console.log('error', err);
                }

                console.log("Added 'moderator' to permissions collection");
            });

            new Permission({
                name: 'admin'
            }).save(err => {
                if(err){
                    console.log('error', err);
                }

                console.log("Added 'admin' to permissions collection");
            });
        }
    });
}

// Routes
require('./routes/options.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/group.routes')(app);
require('./routes/role.routes')(app);
require('./routes/member.routes')(app);
require('./routes/event.routes')(app);

// Set port and listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})