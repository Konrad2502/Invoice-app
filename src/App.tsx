import { useEffect } from "react";
import Container from "./components/Container/Container";
import Nav from "./components/Nav/Nav";
import { selectAppDataStatus } from "./features/appData/appDataSelectors";
import Invoices from "./pages/Invoices/Invoices";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchAppData } from "./features/appData/appDataSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAppDataStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAppData());
    }
  }, [status, dispatch]);

  return (
    <Container>
      <Nav />
      <Invoices />
    </Container>
  );
}
