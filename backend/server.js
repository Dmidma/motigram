const config = require('./config')
const db_config = require('./db_config')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const User = require('./models/user')
const Post = require('./models/post')

app.use(express.static('public'))
app.use(cors())


app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))



app.get('/', (req, res) => {
    const help = `Welcome To Motigram Backend =D`
    res.send(help)
})

app.get('/auth/logout/:username', (req, res) => {
    const username = req.params.username;
    
    User.removeTokenToUser(username).then(data => {
        console.log(`${username} logged out`)
        res.redirect('/')
    })
})


app.post('/auth/login', bodyParser.json(), (req, res) => {
     const username = req.body.username
    const password = req.body.password
    const wrongCreds = {"error": "Wrong Credentials"}
        
    User.fetchUserByUsername(username)
        .then(user => {
            const isValid = user.validPassword(password, user.password)

            if (isValid) {

                User.checkToken(user._id).then(data => {
                    if (data.token !== null) 
                        res.status(500).send({"error": "User is already connected from else where"})
                    else {
                        user.setToken(user._id).then(data => {
                            res.send({
                                username: user.username,
                                email: user.email,
                                id: user._id,
                                token: data.token,
                                joinedDate: user.joinedDate,
                                profilePic: user.profilePic
                            })
                        })
                    }
                })
                
                
            } else {
                res.status(500).send(wrongCreds)
            }

        })
        .catch(error => res.status(500).send(wrongCreds))
})

app.post('/auth/signup', bodyParser.json(), (req, res) => {
    const result = User.addUser(
        req.body.username, 
        req.body.password,
        req.body.email
    )

    result
        .then(user => res.send({"success": "Congratz, a use has been added"}))
        .catch(error => res.status(500).send({"error": "Invalid Credentials. Please Retry"}))
})



/**
 * From this point on, we require a token
 */


app.use((req, res, next) => {
    const token = req.get('Authorization')

    if (token) {
        req.token = token
        User.User.count({ token }).then(data => {
            if (data === 1)
                next()
            else
                res.status(403).send({
                    error: 'Please Login to the Application First'
                })
        })
    } else {
        res.status(403).send({
            error: 'Please Login to the Application First'
        })
    }
})



app.post('/auth/logout', bodyParser.json(), (req, res) => {
    User.removeTokenToUserById(req.body.id)
        .then(user => res.send({"success": "User Logged Off"}))
        .catch(error => res.status(500).send({"error": "Oops, Something went Wrong!"}))
})


app.post('/api/files', bodyParser.json(), (req, res) => {
    const { caption, img, userId } = req.body

    if (userId && img) {
        console.log("Saving Image")
        let currentPost = new Post({
            userId,
            img,
            caption
        })
        currentPost.save().then(data => {
            res.send(data)
        })


    } else {
        res.status(403).send({
            error: 'Please Try Again. Something Went Wrong.'
        })
    }
})


app.get('/api/posts', (req, res) => {
    // TODO: Refactor this to include .limit(nbr)
    // and make the following posts from another call
    Post.find().sort({"creationDate": -1}).then(data => {     

        let userIds = [];
        data.forEach(post => userIds.push(post.userId))

        User.User.find({"_id": {"$in": userIds}}, {username:1, profilePic: 1}).then(users => {
           let completeData = data.map(post => {
                let i = users.findIndex(user => user._id.toString() == post.userId)
               let { likes, _id, userId, img, creationDate, caption } = post
               return {
                   likes,
                   _id,
                   userId,
                   img,
                   creationDate,
                   caption,
                   username: users[i].username,
                   profilePic: users[i].profilePic
               }
           })
           res.send(completeData)
        })
    })
})


app.post('/api/uploadpic', bodyParser.json(), (req, res) => {
    const { img, userId } = req.body

    if (userId && img) {
        console.log("Uploading Image")
    
    User.User.update({_id: userId}, {$set: {profilePic: img}}, {new: true}).then(data => {
        res.send(data)
    })
        

    } else {
        res.status(403).send({
            error: 'Please Try Again. Something Went Wrong'
        })
    }
})


app.get('/api/getuser/:userid', (req, res) => {
    User.fetchUserById(req.params.userid)
        .then(user => {
            res.send(user)
        })
        .catch(error => res.status(500).send({"error": "Unable to find user. Please try again."}))

})



app.listen(config.port, () => {
  console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})

