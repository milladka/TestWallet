interface Milad { 
    getEnergy(): any
}


class Maryam implements Milad {
    public Adderss: string;
    public Owner: string;
    public Amount: number;

    private Token: string;
    private PublicKey: string;
    private PrivateKey: string;

    constructor(onwer: string, address: string, amount: number) {
        this.Adderss = address;
        this.Owner = onwer;
        this.Amount = amount;
    }

    createTransaction(): any {
        this.Adderss;
        var energy: number = this.getEnergy();
        if(energy >= 10){
            ///

        }else{
            //
            //burnTokenForEnergy
        }
        return 'lkjdlkgkjdsogoetgodsgijd';
    }

    getEnergy(){
        this.checkEnergy(this.Token);
        return 10;

    }

    burnTokenForEnergy(){

        // revert

    }


    private checkEnergy(token : string): any {
        /// ... ();

        return token
    }
}

const maryam = new Maryam('11', '765', 110);
maryam.createTransaction();
maryam.getEnergy();