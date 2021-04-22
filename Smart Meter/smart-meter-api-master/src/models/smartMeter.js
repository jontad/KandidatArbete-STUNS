const mongoose = require('mongoose');

const SmartMeter = mongoose.model('SmartMeter', {
    OBISIdentifier: {
        type: String,
        required: true,
        trim: true
    },
    MeterID: {
        type: String,
        required: true,
        trim: true
    },
    MeterType: {
        type: String,
        required: true,
        trim: true
    },
    ActivePowerPlus: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ActivePowerMinus: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ReactivePowerPlus: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ReactivePowerMinus: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    IL1: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    IL2: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    IL3: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ULN1: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ULN2: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ULN3: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    Timestamp: {
        type: Date,
        require: true,
        trim: true,
    },
    ActiveEnergyImport: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ActiveEnergyExport: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ReactiveEnergyImport: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    },
    ReactiveEnergyExport: {
        type: Number,
        require: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Value cannot be negative.');
            }
        }
    }
});

module.exports = SmartMeter;