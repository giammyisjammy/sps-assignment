-- -------------------------------------------------------------------------
-- execute the following statements to create tables
-- -------------------------------------------------------------------------

-- regions
CREATE TABLE regions
  (
    region_id INT AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR( 50 ) NOT NULL
  ) AUTO_INCREMENT = 5;

-- countries table
CREATE TABLE countries
  (
    country_id   CHAR( 2 ) PRIMARY KEY  ,
    country_name VARCHAR( 40 ) NOT NULL,
    region_id    INT                 , -- fk
    CONSTRAINT fk_countries_regions FOREIGN KEY( region_id )
      REFERENCES regions( region_id ) 
      ON DELETE CASCADE
  );

-- location
CREATE TABLE locations
  (
    location_id INT AUTO_INCREMENT 
                PRIMARY KEY       ,
    address     VARCHAR( 255 ) NOT NULL,
    postal_code VARCHAR( 20 )          ,
    city        VARCHAR( 50 )          ,
    state       VARCHAR( 50 )          ,
    country_id  CHAR( 2 )               , -- fk
    CONSTRAINT fk_locations_countries 
      FOREIGN KEY( country_id )
      REFERENCES countries( country_id ) 
      ON DELETE CASCADE
  ) AUTO_INCREMENT = 24;

-- warehouses
CREATE TABLE warehouses
  (
    warehouse_id INT 
                 AUTO_INCREMENT 
                 PRIMARY KEY,
    warehouse_name VARCHAR( 255 ) ,
    location_id    INT, -- fk
    CONSTRAINT fk_warehouses_locations 
      FOREIGN KEY( location_id )
      REFERENCES locations( location_id ) 
      ON DELETE CASCADE
  ) AUTO_INCREMENT = 10;

-- employees
CREATE TABLE employees
  (
    employee_id INT 
                AUTO_INCREMENT 
                PRIMARY KEY,
    first_name VARCHAR( 255 ) NOT NULL,
    last_name  VARCHAR( 255 ) NOT NULL,
    email      VARCHAR( 255 ) NOT NULL,
    phone      VARCHAR( 50 ) NOT NULL ,
    hire_date  DATETIME NOT NULL          ,
    manager_id INT        , -- fk
    job_title  VARCHAR( 255 ) NOT NULL,
    CONSTRAINT fk_employees_manager 
        FOREIGN KEY( manager_id )
        REFERENCES employees( employee_id )
        ON DELETE CASCADE
  ) AUTO_INCREMENT = 108;

-- product_categories
CREATE TABLE product_categories
  (
    category_id INT 
                AUTO_INCREMENT 
                PRIMARY KEY,
    category_name VARCHAR( 255 ) NOT NULL
  ) AUTO_INCREMENT = 6;

-- products
CREATE TABLE products
  (
    product_id BIGINT 
               AUTO_INCREMENT 
               PRIMARY KEY,
    product_name  VARCHAR( 255 ) NOT NULL,
    description   VARCHAR( 2000 )        ,
    standard_cost DECIMAL( 9, 2 )          ,
    list_price    DECIMAL( 9, 2 )          ,
    category_id   INT NOT NULL         ,
	product_color VARCHAR(100) NOT NULL,
    CONSTRAINT fk_products_categories 
      FOREIGN KEY( category_id )
      REFERENCES product_categories( category_id ) 
      ON DELETE CASCADE
  ) AUTO_INCREMENT = 289;

-- customers
CREATE TABLE customers
  (
    customer_id BIGINT 
                AUTO_INCREMENT 
                PRIMARY KEY,
    name         VARCHAR( 255 ) NOT NULL,
    address      VARCHAR( 255 )         ,
    website      VARCHAR( 255 )         ,
    credit_limit DECIMAL( 8, 2 )
  ) AUTO_INCREMENT = 320;

-- contacts
CREATE TABLE contacts
  (
    contact_id BIGINT 
               AUTO_INCREMENT 
               PRIMARY KEY,
    first_name  VARCHAR( 255 ) NOT NULL,
    last_name   VARCHAR( 255 ) NOT NULL,
    email       VARCHAR( 255 ) NOT NULL,
    phone       VARCHAR( 20 )          ,
    customer_id BIGINT                  ,
    CONSTRAINT fk_contacts_customers 
      FOREIGN KEY( customer_id )
      REFERENCES customers( customer_id ) 
      ON DELETE CASCADE
  ) AUTO_INCREMENT = 320;

-- orders
CREATE TABLE orders
  (
    order_id BIGINT 
             AUTO_INCREMENT 
             PRIMARY KEY,
    customer_id BIGINT NOT NULL, -- fk
    status      VARCHAR( 20 ) NOT NULL ,
    salesman_id INT         , -- fk
    order_date  DATETIME NOT NULL          ,
    CONSTRAINT fk_orders_customers 
      FOREIGN KEY( customer_id )
      REFERENCES customers( customer_id )
      ON DELETE CASCADE,
    CONSTRAINT fk_orders_employees 
      FOREIGN KEY( salesman_id )
      REFERENCES employees( employee_id ) 
      ON DELETE SET NULL
  ) AUTO_INCREMENT = 106;

-- order_items
CREATE TABLE order_items
  (
    order_id   BIGINT                                , -- fk
    item_id    BIGINT                                ,
    product_id BIGINT NOT NULL                       , -- fk
    quantity   DECIMAL( 8, 2 ) NOT NULL                        ,
    unit_price DECIMAL( 8, 2 ) NOT NULL                        ,
    CONSTRAINT pk_order_items 
      PRIMARY KEY( order_id, item_id ),
    CONSTRAINT fk_order_items_products 
      FOREIGN KEY( product_id )
      REFERENCES products( product_id ) 
      ON DELETE CASCADE,
    CONSTRAINT fk_order_items_orders 
      FOREIGN KEY( order_id )
      REFERENCES orders( order_id ) 
      ON DELETE CASCADE
  );

-- inventories
CREATE TABLE inventories
  (
    product_id   BIGINT        , -- fk
    warehouse_id INT        , -- fk
    quantity     INT NOT NULL,
    CONSTRAINT pk_inventories 
      PRIMARY KEY( product_id, warehouse_id ),
    CONSTRAINT fk_inventories_products 
      FOREIGN KEY( product_id )
      REFERENCES products( product_id ) 
      ON DELETE CASCADE,
    CONSTRAINT fk_inventories_warehouses 
      FOREIGN KEY( warehouse_id )
      REFERENCES warehouses( warehouse_id ) 
      ON DELETE CASCADE
  );
  
-- -------------------------------------------------------------------------
-- added for this exercise
-- -------------------------------------------------------------------------

 -- invoices
 CREATE TABLE invoices (
  invoice_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT,
  invoice_date DATETIME NOT NULL,
  invoice_details text,

  CONSTRAINT fk_invoices_orders 
  	FOREIGN KEY( order_id ) 
  	REFERENCES orders( order_id )
);

-- invoice line items
CREATE TABLE invoice_line_items (
  order_id BIGINT,
  item_id BIGINT,
  invoice_number bigint,
  product_id bigint,
  product_title VARCHAR(255) NOT NULL,
  product_quantity int NOT NULL,
  product_price DECIMAL( 9, 2 ) NOT NULL,
  PRIMARY KEY (order_id, item_id),
  
  CONSTRAINT fk_invoice_line_items_products FOREIGN KEY (product_id) REFERENCES products (product_id),
  
  CONSTRAINT fk_invoice_line_items_invoices FOREIGN KEY (invoice_number) REFERENCES invoices (invoice_id)
  
  
);

-- transaction types
CREATE TABLE transaction_types (
  transaction_type_code INT PRIMARY KEY AUTO_INCREMENT,
  transaction_type_description VARCHAR(255) NOT NULL
);

-- financial transactions
CREATE TABLE financial_transactions (
  transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT,
  invoice_number bigint,
  transaction_type_code INT,
  transaction_date DATETIME NOT NULL,
  transaction DECIMAL( 9, 2 ) NOT NULL,
  
  CONSTRAINT fk_financial_transactions_transaction_types FOREIGN KEY (transaction_type_code) REFERENCES transaction_types (transaction_type_code),
  
  CONSTRAINT fk_financial_transactions_customers FOREIGN KEY (customer_id) REFERENCES customers (customer_id),
  
  CONSTRAINT fk_financial_transactions_invoices FOREIGN KEY (invoice_number) REFERENCES invoices (invoice_id)
);

ALTER TABLE order_items ADD CONSTRAINT fk_invoice_line_items_order_items FOREIGN KEY (order_id, item_id) REFERENCES invoice_line_items (order_id, item_id);
