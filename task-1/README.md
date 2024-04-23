# Database

> _Crea uno UML con articoli magazzino e transazioni. Assicurati di definire la tipologia di relazione tra le tabelle e la tipologia di dato e di key._

Link a [Diagramma ER](https://dbdiagram.io/d/SPS-Assignment-661fa44f03593b6b61385d61)

Alcune considerazioni:

- come punto di partenza ho usato il classico [Oracle Sample Database](https://www.oracletutorial.com/getting-started/oracle-sample-database/) a cui ho fatto delle aggiunte per accomodare il nostro caso d'uso.
- sono state eliminate dal diagramma le tabelle inutilizzate ai fini dell'esercizio a favore di una ridotta complessità e maggior chiarezza. Le entità sono rimaste in forma di commento nella parte DBML ad eventuale uso futuro.
- trovo che abbia senso separare le entità `orders` e `invoices` dato che sono pertengono a contesti diversi, il primo alla logistica e il secondo alla contabilità. Usando una sola entità si creerebbe inutile confusione che ho preferito evitare - e.g. perchè dovrei mettere nella stessa tabella informazioni su costo e prezzo quando queste due informazioni potrebbero essere disaccoppiate?
- `product_color` è stato definito come attributo della tabella `products` per brevità e per contenere la complessità dell'esercizio. Qualora in produzione emergesse un caso d'uso in cui si rende necessaria un'altra soluzione (enum/altra tabella `product_colors`/etc.) si potrebbe ri-fattorizzare l'entità con relativamente poco sforzo.

---

> _Scrivi una query che ritorna la percentuale di fatturato proveniente da ordini effettuati con contrassegno rispetto ai pagamenti online, per gli articoli di colore NERO. Solo se in magazzino sono disponibili._
