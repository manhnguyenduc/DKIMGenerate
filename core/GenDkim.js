/**
 * Created by TieuVu on 10/23/2015.
 */

var NodeRSA = require('node-rsa');

exports.gendkim = function (bits, domain, selector) {
    var key = new NodeRSA({b: bits});
    var private_key = key.exportKey('pkcs8-private-pem');
    var public_key = key.exportKey('pkcs8-public-pem');


    var public_dns = selector + '._domainkey.' + domain + " IN TXT " + "( v=DKIM1; p=" +
        public_key.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/\s/g, '')
        + " )";
    return {"private_key": private_key, "public_key": public_key, "public_dns": public_dns}
};
