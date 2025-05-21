import countries from "$lib/data/countries-dataset.json";
import countries_asia from "$lib/data/countries-dataset-asia.json";
import countries_europe from "$lib/data/countries-dataset-europe.json";
import countries_north_america from "$lib/data/countries-dataset-north-america.json";
import countries_south_america from "$lib/data/countries-dataset-south-america.json";
import countries_oceania from "$lib/data/countries-dataset-oceania.json";
import countries_africa from "$lib/data/countries-dataset-africa.json";

import countries_reduced from "$lib/data/countries-dataset-reduced.json";


export class GameRunner {

    gameRunning:boolean = $state(false);
    gameOver:boolean = $state(false);
    
    continent = "";
    countries:Object = "";
    questionQueue = [];

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

    lives:number = $state(5);

    constructor(dataset:string="world") {
        // Setup dataset:
        if (dataset == "world") {
            this.countries = this.shuffleArray([...countries]);
            this.continent = "World";
        }
        else if (dataset == "asia") {
            this.countries = this.shuffleArray([...countries_asia]);
            this.continent = "Asia";
        }
        else if (dataset == "europe") {
            this.countries = this.shuffleArray([...countries_europe]);
            this.continent = "Europe";
        }
        else if (dataset == "north-america") {
            this.countries = this.shuffleArray([...countries_north_america]);
            this.continent = "North America";
        }
        else if (dataset == "south-america") {
            this.countries = this.shuffleArray([...countries_south_america]);
            this.continent = "Europe";
        }
        else if (dataset == "oceania") {
            this.countries = this.shuffleArray([...countries_oceania]);
            this.continent = "Oceania";
        }
        else if (dataset == "africa") {
            this.countries = this.shuffleArray([...countries_africa]);
            this.continent = "Africa";
        }
        else if (dataset == "easy") {
            this.countries = this.shuffleArray([...countries_reduced]);
            this.continent = "Easy Mode"
        }

        this.countryNames = this.countries.map(country => country.name);


        // Launch game:
        this.totalCountries = this.countries.length;
        this.questionQueue = [...this.countries];

        this.newGame();

    };

    newGame = () => {
        this.gameOver = false;
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

    newRound = () => {

        if (this.lives <= 0) {

            this.gameRunning = false;
            this.gameOver = true;
            return;

        }
        if (this.questionQueue.length-1 <= 3) {

            // Shuffle question queue:
            this.shuffleArray(this.questionQueue);


            // Setup round object:
            this.round.currentFlagPath = this.questionQueue[0]["flag_4x3"];
            this.round.answer = this.questionQueue[0].name;

            // Bit of a hack to get end of game working:
            let options:Array<Object> = [];
            for (let i = 0; i < this.totalCountries; i++) {
                let temp = this.shuffleArray([...this.countries]);
                if (options.length === 2) {
                    break;
                }
                if (temp[i].name !== this.round.answer && !options.includes(temp[i])) {
                    options.push(temp[i]);
                }
            };


            this.round.options = this.shuffleArray([this.questionQueue[0], options[0], options[1]]);

        }
        else {
            
            // Shuffle question queue:
            this.shuffleArray(this.questionQueue);
            
            
            // Setup round object:
            this.round.currentFlagPath = this.questionQueue[0]["flag_4x3"];
            this.round.answer = this.questionQueue[0].name;
            this.round.options = this.shuffleArray([this.questionQueue[0], this.questionQueue[1], this.questionQueue[2]]);

        
        }


    };


    checkAnswer = (submission:string) => {
        
        let correct = false;

        if (this.round.answer == submission) {
            correct = true;
            this.score ++;
        }
        else {
            this.lives = this.lives - 1;
        }

        let response = {
            "correct": correct,
            "answer": this.round.answer,
            "funFacts": {
                "capital" : this.questionQueue[0]["capital"],
                "languages" : this.questionQueue[0]["languages"],
                "currencies" : this.questionQueue[0]["currencies"]
            }
        }

        // pop answer flag:
        this.questionQueue.shift();

        if (this.progress != this.totalCountries) {

            this.progress ++;
            this.newRound();

        }
        else {
            this.gameOver = true;
            this.gameRunning = false;
        }
        

        return response;

    };



    


}