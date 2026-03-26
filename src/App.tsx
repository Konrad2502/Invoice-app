import { useEffect } from "react";
import Container from "./components/Container/Container";
import Nav from "./components/Nav/Nav";
import { selectAppDataStatus } from "./features/appData/appDataSelectors";
import Invoices from "./pages/Invoices/Invoices";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchAppData } from "./features/appData/appDataSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails/InvoiceDetails";

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAppDataStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAppData());
    }
  }, [status, dispatch]);

  return (
    <BrowserRouter>
      <Container>
        <Nav />
        <Routes>
          <Route path="/" element={<Invoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
