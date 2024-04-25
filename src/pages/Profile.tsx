import { Button, Image, Stack } from "react-bootstrap";
import owl from "../imgs/owl.png";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux-store/stores";
import {
  abortQuoteRequest,
  getAuthor,
  getProfile,
} from "../redux-store/users/thunk";
import { useSelector } from "react-redux";
import { userSelector } from "../redux-store/users/selector";
import UpdateModal from "../components/UpdateModal";
import { resetAuthorAndQuote } from "../redux-store/users";
import classNames from "classnames";

export default function Profile() {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { isLoading, profile, quote, author } = useSelector(userSelector);
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  function handleRequestQuote() {
    dispatch(resetAuthorAndQuote());
    setShow(true);
    dispatch(getAuthor());
  }

  function handleClose() {
    abortQuoteRequest();
    setShow(false);
  }

  return (
    <div className={classNames({ loading: isLoading })}>
      <Stack direction="horizontal" gap={4} className="mb-2">
        <div className="img-profile">
          <Image src={owl} roundedCircle alt="Profile" width={100} />
        </div>
        <Stack direction="vertical" gap={2}>
          <h3>Welcome {profile?.fullname}!</h3>
          <div>
            <Button onClick={handleRequestQuote}>Update</Button>
          </div>
        </Stack>
      </Stack>
      <div>
        {author && <p>Author: {author.name}</p>}
        {quote && <p>Quotes: {quote.quote}</p>}
      </div>
      <UpdateModal show={show} handleClose={handleClose} />
    </div>
  );
}
