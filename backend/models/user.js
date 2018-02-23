const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        uniqure: true,
        required: true,
        trim: true
    },
    profilePic: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    token: {
        type: String,
        default: null
    }
})



const saltRounds = 10;

UserSchema.methods.generateHash = (password) => 
    bcrypt.hashSync(password, saltRounds)
UserSchema.methods.validPassword = (password, hashedPassword) => 
    bcrypt.compareSync(password, hashedPassword)

UserSchema.methods.setToken = (id) => { 
    const token = bcrypt.genSaltSync(saltRounds)
    return User.findByIdAndUpdate(id, { $set: { token }}, {new: true})
}

const checkToken = (id) => {
    return User.findOne({_id: id}, {token: 1})
}

const User = mongoose.model('User', UserSchema)

const addUser = (username, password, email) => {
    let newUser = new User({
        username,
        email
    })
    newUser.password = newUser.generateHash(password)
    return newUser.save()
}


const fetchUserByUsername = (username) => User.findOne({ username })

const fetchUserById = (id) => User.findOne({ _id: id })

const removeTokenToUser = (username) => User.update({ username }, { $set: { token: null}}, {new: true})

const removeTokenToUserById = (id) => User.update({ _id: id }, { $set: { token: null}}, {new: true})




module.exports = {
    User,
    addUser,
    fetchUserByUsername,
    fetchUserById,
    checkToken,
    removeTokenToUser,
    removeTokenToUserById
}
