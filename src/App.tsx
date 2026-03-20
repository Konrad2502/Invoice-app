import Container from "./components/Container/Container";
import Nav from "./components/Nav/Nav";
import Invoices from "./pages/Invoices/Invoices";

export default function App() {
  return (
    <Container>
      <Nav />
      <Invoices />
    </Container>
  );
}
