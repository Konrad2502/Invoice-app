import { useEffect, useState } from "react";
import Container from "./components/Container/Container";
import Nav from "./components/Nav/Nav";
import {
  selectAppDataStatus,
  selectAppData,
} from "./features/appData/appDataSelectors";
import Invoices from "./pages/Invoices/Invoices";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchAppData } from "./features/appData/appDataSlice";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceDetails from "./pages/InvoiceDetails/InvoiceDetails";
import InvoiceDrawer from "./pages/InvoiceDrawer/InvoiceDrawer";
import type { InvoiceDrawerMode } from "./pages/InvoiceDrawer/InvoiceDrawer";
import "./AppShell.scss";
import { setInvoices } from "./features/invoices/invoicesSlice";

export default function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAppDataStatus);
  const appData = useAppSelector(selectAppData);
  const [drawerMode, setDrawerMode] = useState<InvoiceDrawerMode>(null);
  const [editingInvoiceId, setEditingInvoiceId] = useState<number | null>(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAppData());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (appData) {
      dispatch(setInvoices(appData));
    }
  }, [appData, dispatch]);

  return (
    <BrowserRouter>
      <Container>
        <Nav />
        <div className="app-shell__content">
          <Routes>
            <Route
              path="/"
              element={<Invoices setDrawerMode={setDrawerMode} />}
            />
            <Route
              path="/invoices/:id"
              element={
                <InvoiceDetails
                  setDrawerMode={setDrawerMode}
                  setEditingInvoiceId={setEditingInvoiceId}
                />
              }
            />
          </Routes>
          <InvoiceDrawer
            mode={drawerMode}
            setDrawerMode={setDrawerMode}
            editingInvoiceId={editingInvoiceId}
          />
        </div>
      </Container>
    </BrowserRouter>
  );
}
