import React from 'react'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FontIcon from 'material-ui/FontIcon'
import { red500, greenA200 } from 'material-ui/styles/colors'

import logo from '../assets/motius_logo.jpg';
class PostCard extends React.Component {
    


    render() {

        let profilePicture = require("../assets/default_person_image.png")
        if (this.props.postProperties.profilePic && this.props.postProperties.profilePic !== null)
            profilePicture = this.props.postProperties.profilePic

        return (
         <Card className="some-space">
            <CardHeader
              title={this.props.postProperties.username}
              avatar={profilePicture}
            onClick={() => {this.props.handleProfileModel(this.props.postProperties.userId)}}
            />
            <CardMedia>
              <img src={this.props.postProperties.img} alt="" />
            </CardMedia>
            <CardTitle title={this.props.postProperties.caption}  />
            <CardActions >


            <FontIcon
                className="material-icons"
                color={red500}
                hoverColor={greenA200} >
                    favorite
            </FontIcon>
            <div className="take-the-line">{this.props.postProperties.likes}</div>
            </CardActions>
          </Card>
        )
    }
}


export default PostCard
