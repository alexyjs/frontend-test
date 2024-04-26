import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ILoginRequest } from "../redux-store/users/types";
import { useAppDispatch } from "../redux-store/stores";
import { loginAsync } from "../redux-store/users/thunk";
import { useSelector } from "react-redux";
import { userSelector } from "../redux-store/users/selector";
import classNames from "classnames";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format.")
      .required("This field is required."),
    password: yup.string().required("This field is required."),
    rememberMe: yup.boolean().nullable(),
  })
  .required();

export default function SignIn() {
  const nav = useNavigate();
  const { isLoading, error } = useSelector(userSelector);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequest>({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    dispatch(loginAsync(data));
  });

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN)) {
      nav("/profile");
    }
  }, [nav]);

  return (
    <div>
      {error && (
        <Form.Text className="text-danger">
          Email or password is not correct!
        </Form.Text>
      )}
      <Form.Group className="mb-3" controlId="EmailInput">
        <Form.Label>Email</Form.Label>
        <Form.Control
          {...register("email")}
          type="email"
          placeholder="Enter Email"
          className={classNames({ "border-danger-subtle": errors.email })}
        />
        <Form.Text id="emailHelpBlock" muted>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="passwInput">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className={classNames({ "border-danger-subtle": errors.password })}
          {...register("password")}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button disabled={isLoading} onClick={onSubmit}>
        {isLoading ? "Loading…" : "Submit"}
      </Button>
    </div>
  );
}
