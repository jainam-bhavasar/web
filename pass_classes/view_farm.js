const { v4: uuidv4 } = require('uuid');

function getViewFarmClassId(issuerId) {
    return `${issuerId}.VIEW_FARM_OFFER`;
}

function viewFarmOfferClass(issuerId) {
    let classId = getViewFarmClassId(issuerId);
    return {
        "id": classId
    };
}

function viewFarmOfferObject(issuerId, farmLink) {
    let classId = getViewFarmClassId(issuerId);
    let uuid = uuidv4().toString();
    let id = `${issuerId}.${uuid}`;
    return {
        "id": id,
        "classId": classId,
        "cardTitle": {
            "defaultValue": {
                "language": "en-US",
                "value": "Grow Green"
            }
        },
        "subheader": {
            "defaultValue": {
                "language": "en-US",
                "value": "To check my Farm,"
            }
        },
        "header": {
            "defaultValue": {
                "language": "en-US",
                "value": "Scan This"
            }
        },
        "barcode": {
            "type": "QR_CODE",
            "value": farmLink,
            "alternateText": "QR Code"
        },
        "hexBackgroundColor": "#000000"
    }
}

module.exports = {
    getViewFarmClassId,
    viewFarmOfferClass,
    viewFarmOfferObject
}