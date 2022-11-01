type TUser = {
    id: string
}

export interface IMagusApp {
    user: TUser
};

export class MagusApp implements IMagusApp{

    public user: TUser;

    constructor(value: TUser){
        this.user = value;
    }
}