import { useEffect } from "react";
import { useAppDispatch } from "../redux-store/stores";
import { getCompanyInfo } from "../redux-store/company/thunk";
import { useSelector } from "react-redux";
import { companySelector } from "../redux-store/company/selector";
import DOMPurify from "dompurify";

export default function AboutUs() {
  const dispatch = useAppDispatch();
  const { isLoading, info } = useSelector(companySelector);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);
  const cleanInfo = DOMPurify.sanitize(info || "");
  return (
    <div>
      <h4 dangerouslySetInnerHTML={{ __html: cleanInfo }}></h4>
    </div>
  );
}
