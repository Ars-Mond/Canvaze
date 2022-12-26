export class Quaternion {
    private angle: number;

    constructor(angle: number) {
        this.angle = angle;
    }

    get RotationMatrix() {
        return [[Math.cos(this.angle), -Math.sin(this.angle)], [Math.sin(this.angle), Math.cos(this.angle)]];
    }

}

export default Quaternion;