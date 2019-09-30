var util = require('util');

module.exports = function (restClient) {
    var module = {};

    module.list = function (sku) {
        var endpointUrl = util.format('/stockStatuses/%s', encodeURIComponent(sku));
        return restClient.get(endpointUrl).then(result => {
            return {
                ...result.stock_item,
                stock_id: result.stock_id,
                qty: result.qty,
                stock_id: result.stock_id,
                is_in_stock: qty > 1 ? result.stock_item.is_in_stock : false
            }
        }).catch(err => err)
    }

    // MSI
    module.getSalableQty = function (sku, stockId) {
        var endpointUrl = util.format(
            '/inventory/get-product-salable-quantity/%s/%d',
            encodeURIComponent(sku),
            encodeURIComponent(stockId)
        );
        return restClient.get(endpointUrl);
    }

    // MSI
    module.isSalable = function (sku, stockId) {
        var endpointUrl = util.format(
            '/inventory/is-product-salable/%s/%d',
            encodeURIComponent(sku),
            encodeURIComponent(stockId)
        );
        return restClient.get(endpointUrl);
    }

    return module;
}

/**
 * stockStatuses
 * {
    "product_id": 2078,
    "stock_id": 1,
    "qty": 0,
    "stock_status": 0,
    "stock_item": {
        "item_id": 2600,
        "product_id": 2078,
        "stock_id": 1,
        "qty": 2,
        "is_in_stock": true,
        "is_qty_decimal": false,
        "show_default_notification_message": false,
        "use_config_min_qty": true,
        "min_qty": 0,
        "use_config_min_sale_qty": 1,
        "min_sale_qty": 1,
        "use_config_max_sale_qty": true,
        "max_sale_qty": 10000,
        "use_config_backorders": true,
        "backorders": 0,
        "use_config_notify_stock_qty": true,
        "notify_stock_qty": 1,
        "use_config_qty_increments": true,
        "qty_increments": 0,
        "use_config_enable_qty_inc": true,
        "enable_qty_increments": false,
        "use_config_manage_stock": true,
        "manage_stock": true,
        "low_stock_date": null,
        "is_decimal_divided": false,
        "stock_status_changed_auto": 0
    }
}

* stockItems
{
    "item_id": 2600,
    "product_id": 2078,
    "stock_id": 1,
    "qty": 2,
    "is_in_stock": true,
    "is_qty_decimal": false,
    "show_default_notification_message": false,
    "use_config_min_qty": true,
    "min_qty": 0,
    "use_config_min_sale_qty": 1,
    "min_sale_qty": 1,
    "use_config_max_sale_qty": true,
    "max_sale_qty": 10000,
    "use_config_backorders": true,
    "backorders": 0,
    "use_config_notify_stock_qty": true,
    "notify_stock_qty": 1,
    "use_config_qty_increments": true,
    "qty_increments": 0,
    "use_config_enable_qty_inc": true,
    "enable_qty_increments": false,
    "use_config_manage_stock": true,
    "manage_stock": true,
    "low_stock_date": null,
    "is_decimal_divided": false,
    "stock_status_changed_auto": 0
}
 */