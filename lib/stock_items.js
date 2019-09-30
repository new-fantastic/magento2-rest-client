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
                is_in_stock: result.qty >= 1 ? result.stock_item.is_in_stock : false
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
