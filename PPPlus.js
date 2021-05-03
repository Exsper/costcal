class PPPlus {
    /**
     * 
     * @param {Object} data 
     * @param {Number} data.AimJump
     * @param {Number} data.AimFlow
     * @param {Number} data.Precision
     * @param {Number} data.Speed
     * @param {Number} data.Stamina
     * @param {Number} data.Accuracy
     */
    constructor(data) {
        this.AimJump = data.AimJump;
        this.AimFlow = data.AimFlow;
        this.Precision = data.Precision;
        this.Speed = data.Speed;
        this.Stamina = data.Stamina;
        this.Accuracy = data.Accuracy;
    }

    F1(x) {
        return Math.pow(x, 1.0 / x - 1.0);
    }

    Integral(f, min, max) {
        const N = 100000;
        let result = 0;
        let delta = (max - min) / N;
        for (let i = 0; i < N; i++) {
            result += f(min + (i + 0.5) * delta) * delta;
        }
        return result;
    }

    OCLCost() {
        let acc = Math.max(this.Accuracy, 500);
        let cost1 = (Math.sqrt(this.AimJump / 3000.0) + Math.sqrt(this.AimFlow / 1500.0)) * (Math.sqrt(this.AimJump / 3000.0) + Math.sqrt(this.AimFlow / 1500.0)) / 4.0;
        cost1 = cost1 * (1.0 + this.Precision / 5000.0) / 1.2;
        let cost2 = Math.pow((acc - 500.0) / 2000.0, 0.6) * 0.8;
        let cost3 = Math.pow(this.Integral(this.F1, 1.0, 1.0 + this.Speed / 1000.0) / 2.0, 0.8) * Math.pow(this.Integral(this.F1, 1.0, 1.0 + this.Stamina / 1000.0) / 2.0, 0.5);
        let cost = cost1 + cost2 + cost3;
        return cost;
    }

    DrugCost() {
        let cost = Math.pow((this.AimJump / 3000.0), 0.85) * Math.pow((this.AimFlow / 1500.0), 0.45) + Math.atan((this.Speed / 2000.0)) * 1.3 + (this.Accuracy / 4000);
        return cost;
    }

    MP4Cost() {
        let cost = Math.pow(
            ((0.02 * (10.0 * Math.sqrt((Math.atan((2 * this.AimJump - (2648.0 + 2191.0)) / (2648.0 - 2191.0)) + Math.PI / 2.0 + 8.0)
                * (Math.atan((2.0 * this.AimFlow - (715.0 + 496.0)) / (715.0 - 496.0)) + Math.PI / 2.0 + 3.0))
                + 7.0 * (Math.atan((2.0 * this.Speed - (1626.0 + 1356.0)) / (1626.0 - 1356.0)) + Math.PI / 2.0)
                + 3.0 * (Math.atan((2.0 * this.Stamina - (1271.0 + 1020.0)) / (1271.0 - 1020.0)) + Math.PI / 2.0)
                + 5.0 * (Math.atan((2.0 * this.Accuracy - (1425.0 + 1101.0)) / (1425.0 - 1101.0)) + Math.PI / 2.0)
                + 5.0 * (Math.atan((2.0 * this.Precision - (597.0 + 466.0)) / (597.0 - 466.0)) + Math.PI / 2.0))) - 1.0)
            , 2.5);
        return cost;
    }

    OutputText() {
        const valOCLCost = this.OCLCost().toFixed(4);
        const valDrugCost = this.DrugCost().toFixed(4);
        const valMP4Cost = this.MP4Cost().toFixed(4);
        let output = "";
        output = output + "Jump: " + this.AimJump + "\n";
        output = output + "Flow: " + this.AimFlow + "\n";
        output = output + "Precision: " + this.Precision + "\n";
        output = output + "Acc: " + this.Accuracy + "\n";
        output = output + "Speed: " + this.Speed + "\n";
        output = output + "Stamina: " + this.Stamina + "\n";
        output = output + "\n";
        output = output + "OCL Cost: " + valOCLCost + "\n";
        output = output + "毒品杯 Cost: " + valDrugCost + "\n";
        output = output + "MP4 Cost: " + valMP4Cost + "\n";
        return output;
    }

}