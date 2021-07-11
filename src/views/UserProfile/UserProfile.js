/* eslint-disable react/prop-types */
import React, { useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import {} from '../../store/actions/user.actions'
import { userService } from '../../services/user.service'

import avatar from "assets/img/faces/marc.jpg";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateUser } from '../../store/actions/user.actions'
import { withRouter } from "react-router-dom";
import { useToasts } from 'react-toast-notifications';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

function UserProfile() {
  const [user, setUser] = useState()
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch()
  const classes = useStyles();
  const { addToast, removeToast } = useToasts();


  useEffect(() => {
    if (!isMounted) {
      loadLoggedInUser()
    }
    async function loadLoggedInUser() {
      await loadUser()
      setIsMounted(true)
    }
  })
  const loadUser = async () => {
    const loggedInUser = await userService.getLoggedinUser()
    setUser(loggedInUser)
  }
  const handleChange = (({ target }) => {
    const field = target.name;
    const value = target.value;
    setUser((prevState) => ({
      ...prevState,
      [field]: value
    }))
  })

  const onSubmit = async (ev) => {
    ev.preventDefault()
    try {
      await dispatch(updateUser(user))
      addToast('Update success', { appearance: 'success',id:'update-user-success' }) 
      setTimeout(()=>{
        removeToast('update-user-success')
      },2000)
    }
    catch (err) {
      addToast('Update error', { appearance: 'success',id:'update-user-error' }) 
      setTimeout(()=>{
        removeToast('update-user-error')
        
      },2000)
    }



  }
  if (!user) return <div>Loading...</div>
  return (
      <div className='container'>

        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                <p className={classes.cardCategoryWhite}>Complete your profile</p>
              </CardHeader>
              <form onSubmit={onSubmit}>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <TextField
                        value={user.company}
                        onChange={handleChange}
                        name="company"
                        label="Company"
                        id="company-disabled"
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <TextField
                        value={user.username}
                        onChange={handleChange}
                        name="username"
                        label="Username"
                        id="username"
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.email}
                        onChange={handleChange}
                        name="email"
                        label="Email address"
                        id="email-address"
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.password}
                        onChange={handleChange}
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.firstName}
                        onChange={handleChange}
                        name="firstName"
                        label="First Name"
                        id="first-name"
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.lastName}
                        onChange={handleChange}
                        name="lastName"
                        label="Last Name"
                        id="last-name"
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.city}
                        onChange={handleChange}
                        name="city"
                        label="City"
                        id="city"
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.country}
                        onChange={handleChange}
                        name="country"
                        label="Country"
                        id="country"
                        fullWidth
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                        value={user.postalCode}
                        onChange={handleChange}
                        label="Postal Code"
                        name="postalCode"
                        id="postal-code"
                        fullWidth
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <TextField
                        value={user.aboutMe}
                        onChange={handleChange}
                        name="aboutMe"
                        label="About me"
                        id="about-me"
                        fullWidth
                        multiline={true}
                        rows={2}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">Update Profile</Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>{`${user.firstName} ${user.lastName}`}</h4>
                <p className={classes.description}>
                  {user.aboutMe}
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
  );
}

export default withRouter(UserProfile)