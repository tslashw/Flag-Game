import countries from '$lib/data/countries.json';


export class GameRunner {

    gameRunning:boolean = $state(false);
    
    countries = countries;

    totalCountries:number = countries.length;
    progress:number = $state(1);
    score:number = $state(0);

    round = $state(
        {
            "currentFlagPath" : "",
            "answer" : "",
            "options" : [],

        }
    );

    lives:number = $state(3);

    timeLeft:number = $state(10);
    roundTimer = 0;

    constructor() {

       this.gameRunning = true;
       this.newRound();

    };

    shuffleArray = (array:Array<Object>) => {
        
        // Fisher-Yates shuffle:
        for (let i = array.length - 1; i >= 1; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;

    };

    startRoundTimer = () => {
        this.roundTimer = setInterval(() => {
            this.reduceTimer();
            }, 10);
    };

    clearRoundTimer = () => {
        clearInterval(this.roundTimer);
        this.timeLeft = 10;
    }

    reduceTimer = () => {
        this.timeLeft = this.timeLeft - 0.01;
        
        // If time runs out:
        if (this.timeLeft <= 0) {
            // this.clearRoundTimer();
            alert(`Ran out of time! ${this.timeLeft}`);
            this.lives -= 1;
            this.clearRoundTimer();
            this.newRound();
        }
    }

    newRound = () => {

        if (this.lives <= 0) {
            // alert("GAME OVER!");
            this.gameRunning = false;
            clearInterval(this.roundTimer);
        }

        this.clearRoundTimer();
        this.startRoundTimer();
        
        // Shuffle countries:
        this.countries = this.shuffleArray(this.countries);

        // Setup round object:
        this.round.currentFlagPath = `static/flags/SVG/${this.countries[0].code2l}.svg`;
        this.round.answer = this.countries[0].name;
        this.round.options = this.shuffleArray([this.countries[0].name, this.countries[1].name, this.countries[2].name]);


        // pop answer flag:




    };


    checkAnswer = (submission:string) => {
        if (this.round.answer == submission) {
            alert("Correct!");
            this.score ++;
        }
        else {
            alert(`Wrong! the answer is ${this.round.answer}`);
            this.lives = this.lives - 1;
        }

        this.progress ++;
        this.newRound();
    };



    


}