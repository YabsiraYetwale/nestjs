CREATE OR REPLACE FUNCTION generate_invoice_number()
  RETURNS TRIGGER AS $$
  BEGIN
    NEW.invoice_number := 'INV-' || LPAD(NEXTVAL('invoice_number_seq')::TEXT, 3, '0');
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_invoice_number
  BEFORE INSERT ON "Invoices"
  FOR EACH ROW
  WHEN (NEW.invoice_number IS NULL)
  EXECUTE FUNCTION generate_invoice_number();