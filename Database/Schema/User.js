const mongoose = require("mongoose");

module.exports = mongoose.model("User", new mongoose.Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
    coins: { type: Number, default: 1000 },
    bank: { type: Number },
    workcd: { type: Number},
}));