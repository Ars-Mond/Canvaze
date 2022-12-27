import Quaternion from "@/Quaternion";

class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    get Zero(): Vector2 {
        return new Vector2();
    }
    get Forward(): Vector2 {
        return new Vector2(1, 0);
    }
    get Backward(): Vector2 {
        return new Vector2(-1, 0);
    }
    get Right(): Vector2 {
        return new Vector2(0, 1);
    }
    get Left(): Vector2 {
        return new Vector2(0, -1);
    }

    static Center = (a: Vector2, b: Vector2): Vector2 => {
        return new Vector2(a.x + (b.x - a.x) / 2, a.y + (b.y - a.y) / 2)
    };

    static Dot = (a: Vector2, b: Vector2): number => {
        return a.x * b.x + a.y * b.y;
    };

    static Magnitude = (a: Vector2): number => {
        return Math.sqrt(a.x * a.x + a.y * a.y);
    };

    static Distance = (a: Vector2, b: Vector2): Vector2 => {
        return new Vector2(a.x - b.x, a.y - b.y);
    };

    static Add = (a: Vector2, b: Vector2): Vector2 => {
        return new Vector2(a.x + b.x, a.y + b.y);
    };

    static Sub = (a: Vector2, b: Vector2): Vector2 => {
        return new Vector2(a.x - b.x, a.y - b.y);
    };

    static Mul = (a: Vector2, b: number): Vector2 => {
        return new Vector2(a.x * b, a.y * b)
    };

    static Div = (a: Vector2, b: number): Vector2 => {
        return new Vector2(a.x / b, a.y / b);
    };

    static Rotation = (a: Vector2, b: Quaternion): Vector2 => {
        return new Vector2(a.x * b.RotationMatrix[0][0] + a.y * b.RotationMatrix[0][1], a.x * b.RotationMatrix[1][0] + a.y * b.RotationMatrix[1][1]);
    }
}

export default Vector2;