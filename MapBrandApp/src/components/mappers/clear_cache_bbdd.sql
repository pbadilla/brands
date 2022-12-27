UPDATE `rg_product` SET `cache_default_attribute` = 0;

UPDATE `rg_product_shop` SET `cache_default_attribute` = 0;

UPDATE `rg_product` AS p, `rg_product_attribute` AS pa SET p.`cache_default_attribute` = pa.`id_product_attribute`
WHERE p.`id_product` = pa.`id_product` AND pa.`default_on` = 1

UPDATE `rg_product_shop` AS p, `rg_product_attribute` AS pa SET p.`cache_default_attribute` = pa.`id_product_attribute`
WHERE p.`id_product` = pa.`id_product` AND pa.`default_on` = 1