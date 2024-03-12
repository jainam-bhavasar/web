function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

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
    let uuid = uuidv4();
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