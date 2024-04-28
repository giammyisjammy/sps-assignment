-- Scrivi una query che ritorna la percentuale di fatturato proveniente da ordini effettuati con
-- contrassegno rispetto ai pagamenti online, per gli articoli di colore NERO. Solo se in magazzino sono
-- disponibili.
SELECT 
	tt.transaction_type_description as 'Tipologia pagamento',
	SUM(ili.product_quantity * ili.product_price) as 'Totale',
	(
		SUM(ili.product_quantity * ili.product_price) / (SELECT SUM(i_ili.product_quantity * i_ili.product_price) FROM sps.invoice_line_items i_ili)
	) * 100 AS 'Percentuale sul fatturato'
FROM sps.invoices i
JOIN sps.invoice_line_items ili  ON i.invoice_id = ili.invoice_number 
JOIN sps.financial_transactions ft ON ft.invoice_number = i.invoice_id 
JOIN sps.transaction_types tt ON tt.transaction_type_code = ft.transaction_type_code 
WHERE 
	1 = 1 
	-- l'ordine ha una transazione pagata con contrassegno
	# AND ft.transaction_type_code IN (
	# 	SELECT transaction_type_code 
	# 	FROM transaction_types tt 
	# 	WHERE transaction_type_description = 'CashOnDelivery' 
	# )
	-- prodotti disponibili in magazzino
	AND ili.product_id IN (
		SELECT DISTINCT product_id 
		FROM sps.inventories i 
		WHERE quantity > 0
	)
	-- prodotti colore nero
	AND ili.product_id IN (
		SELECT DISTINCT p.product_id
		FROM sps.products p
		WHERE product_color = 'black'
	)
GROUP BY tt.transaction_type_description
;

