import { Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_KEY } from "../constants";
import { useAppDispatch } from "../redux-store/stores";
import { logoutAsync } from "../redux-store/users/thunk";

export default function Header() {
  const nav = useNavigate();
  const isAuthen = !!localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logoutAsync());
  }

  return (
    <Stack direction="horizontal" gap={2} className="mb-4">
      <Button variant="outline-dark" onClick={() => nav("/aboutus")}>
        About us
      </Button>
      {isAuthen ? (
        <>
          <Button variant="outline-dark" onClick={() => nav("/profile")}>
            Profile
          </Button>
          <Button variant="outline-dark" onClick={handleLogout}>
            Sign out
          </Button>
        </>
      ) : (
        <Button variant="outline-dark" onClick={() => nav("/signin")}>
          Sign in
        </Button>
      )}
    </Stack>
  );
}
