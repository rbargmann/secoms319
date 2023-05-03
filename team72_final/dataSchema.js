const mongoose = require("mongoose");
const ReactFormDataSchema = new mongoose.Schema(
    {
        productName: {type: String},
        productID: { type: Number },
        productDescription:{
            size: {type: String},
            resolution: {type: String},
            processor: {type: String},
            ram: {type: String},
            storage: {type: String},
            operatingSystem: {type: String},
            price: {type: Number}
        },
        image: {type: FileSystemDirectoryEntry}, // LOACATION ????
        product_url: {type: URL},
        rating: {
            rate: { type: Number },
            count: { type: Number },
        },
    },
    { collection: "fakestore_catalog" }
);
const Product = mongoose.model("Product", ReactFormDataSchema);
module.exports = Product;


/**
 *  {
            "productName": "Lenovo Thinkpad",
            "productID": "6",
            "productDescription": {
                "size": "13.3\"",
                "resolution": "1920 x 1200",
                "processor": "Intel 12th Generation Core i7",
                "ram": "16GB",
                "storage": "512 GB",
                "operatingSystem": "Windows 11 Home",
                "price": "$1,279.99"
            },
            "image_url": "./images/lenovo.jpg",
            "product_url": "https://www.bestbuy.com/site/lenovo-thinkpad-l13-yoga-13-3-wuxga-1920-x-1200-touch-2-in-1-laptop-core-i7-1255u-16gb-memory-512gb-ssd-black/6520607.p?skuId=6520607"
        }
    ],
    "Headphones": [
        {
            "productName": "Bose Quiet Comfort 45",
            "productID": "1",
            "productDescription": {
                "noiseCancelling": "Yes",
                "connectionType": "Wireless (Bluetooth)",
                "waterRessistant": "Yes",
                "batterLife": "22 hours",
                "microphone": "Yes",
                "compatableOS": "IOS, Android",
                "price": "$279.00"
            },
            "image_url": "./images/bose.jpg",
            "product_url": "https://www.bestbuy.com/site/bose-quietcomfort-45-wireless-noise-cancelling-over-the-ear-headphones-triple-black/6471291.p?skuId=6471291"
        },
 */