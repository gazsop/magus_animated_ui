export class CustomDate{
    protected _initDate: string;
    protected _formattedString = "";
    constructor(dateString: string){
        this._initDate = dateString;
        this._formattedString = CustomDate.formatDate(this._initDate);
    }
    public static formatDate(dateString: string){
        return new Date(dateString).toLocaleString("hu-HU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
    }
    get getFormattedString(){
        return this._formattedString;
    }
}