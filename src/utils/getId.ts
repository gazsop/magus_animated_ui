export class Id {

    public static getRand(length = 18){
        if(length < 3 || length > 18) length = 18;
        return this.getString(length);
    }

    public static getRandMultiple(length = 18, count = 2){
        const returnArray = []
        for (let i = 0; i < count; i++) returnArray.push(this.getString(length));
        return returnArray;
    }

    protected static getString(length: number){
        const timePart = Date.now().toString().substring(5);
        const randPart = Math.random().toString(36).substring(3);
        if(length < 10) return timePart.substring(5) + randPart.substring(9 - length)
        return timePart + randPart.substring(18 - length);
    }
}