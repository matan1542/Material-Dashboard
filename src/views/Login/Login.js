/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector} from "react-redux";
import { login } from '../../store/actions/user.actions'


export default function Login(props) {
  const dispatch = useDispatch();
  const {loggedInUser} = useSelector((state)=> state.userModule)
  const initialValues = { email: "", password: "" };

  useEffect(() => {
    onLoad();
  },[loggedInUser]);

  async function onLoad() {
    if(loggedInUser?.token) props.history.push('/admin/dashboard');
  }

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length < 5) {
      errors.password = "too short pass";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
     await dispatch(login(values))
      props.history.push("/admin/dashboard")
      setSubmitting(false);
    }
    catch (err) {
      throw new Error('Had problem with the login')
    }

  };
  const TextFieldOutlined = (props) => (
    <TextField {...props} variant="outlined" margin="normal" fullWidth />
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          style={{
            margin: "10px",
            backgroundColor: "#3f51b5",
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          <Form
            style={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <Field
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              as={TextFieldOutlined}
            />
            <ErrorMessage name="email" component="div" />
            <Field
              type="password"
              name="password"
              label="password"
              autoComplete="password"
              as={TextFieldOutlined}
            />
            <ErrorMessage name="password" component="div" />
            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              style={{
                marginTop: "10px",
              }}
            >
              Sign In
            </Button>
          </Form>
        </Formik>

        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
