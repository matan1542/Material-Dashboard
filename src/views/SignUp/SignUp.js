/* eslint-disable react/prop-types */
// @material-ui/core components
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, TextField } from "@material-ui/core";
import { signup } from '../../store/actions/user.actions'
import { useDispatch, useSelector } from "react-redux";
import { Link } from "@material-ui/core";

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
//define how how the user should be called
const useStyles = makeStyles(styles);
const initalUserObj = {
  username: "",
  email: "",
  firstName: "",
  password: "",
  lastName: "",
  city: "",
  country: "",
  postalCode: "",
  aboutMe: ""
};
export default function SignUp(props) {
  const dispatch = useDispatch();
  const {loggedInUser} = useSelector((state)=> state.userModule)
  const classes = useStyles();
  useEffect(() => {
    onLoad();
  });

  async function onLoad() {
    if(loggedInUser?.token) props.history.push('/admin/dashboard')
  }
  const onSubmit = async (values, { setSubmitting }) => {
    const user = {
      username: values.username,
      email: values.emailAddress,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      company: values.company,
      city: values.city,
      country: values.country,
      postalCode: values.postalCode,
      aboutMe: values.aboutMe
    };
    
    try {
      await dispatch(signup(user));
      // eslint-disable-next-line react/prop-types
      props.history.push("/admin/dashboard");
      setSubmitting(false);
    } catch (err) {
      console.log("Error in signUp", err);
    }

  };

  const validate = values => {
    const errors = {};
    if (!values.emailAddress) {
      errors.emailAddress = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.emailAddress)) {
      errors.emailAddress = "Invalid email address";
    }
    if (values.password.length < 5) {
      errors.password = "too short pass";
    }
    if (!values.username) errors.username = "Required";
    if (!values.company) errors.company = "Required";
    if (!values.firstName) errors.firstName = "Required";
    if (!values.lastName) errors.lastName = "Required";
    if (!values.city) errors.city = "Required";
    if (!values.country) errors.country = "Required";
    if (!values.postalCode) errors.postalCode = "Required";
    if (!values.aboutMe) errors.aboutMe = "Required";
    return errors;
  };
  const TextFieldOutlined = (props) => (
    <TextField {...props} fullWidth />
  );
  return (
    <div>
      <GridContainer>
        <Formik
          initialValues={initalUserObj}
          validate={validate}
          onSubmit={onSubmit} >
          <GridItem xs={12} sm={12} md={12}>
            <Form>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>SignUp </h4>
                  <p className={classes.cardCategoryWhite}>
                    Complete your profile
                  </p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <Field
                        name="company"
                        label="Company"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="company" component="div" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                      <Field
                        name="username"
                        label="Username"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="username" component="div" />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="emailAddress"
                        label="Email address"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="emailAddress" component="div" />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="firstName"
                        id="firstName"
                        label="First Name"
                        as={TextFieldOutlined}
                      />
                      <ErrorMessage name="firstName" component="div" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="lastName"
                        label="Last Name"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="lastName" component="div" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="password"
                        label="Password"
                        type="password"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="password" component="div" />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="city"
                        label="City"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="city" component="div" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="country"
                        label="Country"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="country" component="div" />
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4}>
                      <Field
                        name="postalCode"
                        label="Postal Code"
                        as={TextFieldOutlined} />
                      <ErrorMessage name="postalCode" component="div" />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Field
                        name="aboutMe"
                        label="About Me"
                        multiline={true}
                        rows={2}
                        as={TextFieldOutlined} />
                      <ErrorMessage name="aboutMe" component="div" />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">Sign Up Profile</Button>
                </CardFooter>
                <Box m={1}>
            <Link href="/login" variant="body2">
              {"Do you have an account? Log in"}
            </Link>
            </Box>
       
              </Card>
            </Form>
          </GridItem>
        </Formik>
      </GridContainer>
    </div>
  );
}
