
enum TILE_SUIT {
    CHARACTER,
    BAMBOO,
    CIRCLE,
    HONOR
}
enum WIND_DIRECTION {
    EAST = 1,
    SOUTH = 2,
    WEST = 3,
    NORTH = 4,
}
enum DRAGON {
    WHITE = 5,
    GREEN = 6,
    RED = 7,
}

class Tile {
    suit: TILE_SUIT;
    value: number;
    isSpecial: boolean;

    constructor(suit: TILE_SUIT, value: number, isSpecial: boolean=false){
        this.suit = suit;
        this.value = value;
        this.isSpecial = isSpecial;
    }
    equals(other: Tile, checkSpecial: boolean=false){
        if(this.suit != other.suit){return false;}
        if(this.value != other.value){return false;}
        if(checkSpecial){
            return (this.isSpecial == other.isSpecial);
        }
        return true;
    }
}

class TileSet {
    tiles: Tile[];

    constructor(tiles: Tile[]){
        this.tiles = tiles;
    }
    has(tile: Tile):boolean{
        for(const other of this.tiles){
            if(tile.equals(other)){
                return true;
            }
        }
        return false;
    }
    hasPairOf(tile: Tile){
        return this.count(tile) >= 2;
    }
    hasTripletOf(tile: Tile){
        return this.count(tile) >= 3;
    }
    hasSuitOfAnyValue(suit: TILE_SUIT){
        for(const tile of this.tiles){
            if(tile.suit == suit){return true;}
        }
        return false;
    }
    listMissingFrom(other: TileSet): TileSet{
        var missingTiles = [];
        var visittedTiles = new TileSet([]);
        for( const tile of other.tiles ){
            if(visittedTiles.has(tile)){continue;}
            let otherCount = other.count(tile);
            let thisCount = this.count(tile);
            let missing = otherCount - thisCount;
            if(missing > 0){
                for(let i=0; i<missing; i+=1){
                    missingTiles.push(tile);
                }
            }
            visittedTiles.addTiles(new TileSet([tile]));
        }
        return new TileSet(missingTiles);
        // return new TileSet(other.tiles.filter((tile)=>!this.has(tile)));

        // for( const tile of other.tiles ){
        //     if(!this.has(tile)){
        //         missingTiles.push(tile);
        //     }
        // }
        // return new TileSet(missingTiles);
    }
    hasValueInAnySuit(value: number){
        let suitsToCheck = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        for(const suit of suitsToCheck){
            var tiles = this.tiles.filter( (tile: Tile) => tile.suit==suit );
            for(const tile of tiles){
                if(tile.value == value){
                    return true;
                }
            }
        }
        return false;
    }
    listSuits(){
        var suits = new Set();
        for(const tile of this.tiles){
            suits.add(tile.suit);
        }
        return suits;
    }
    count(tile: Tile):number{
        let matches = this.tiles.filter((other) => tile.equals(other))
        return matches.length;
    }
    shuffle(){
        var shuffled = this.tiles
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        this.tiles = shuffled;
    }
    sort(){
        var bamboos = this.tiles.filter( (tile: Tile)=> tile.suit==TILE_SUIT.BAMBOO ).sort((a,b) => a.value-b.value);
        var characters = this.tiles.filter( (tile: Tile)=> tile.suit==TILE_SUIT.CHARACTER ).sort((a,b) => a.value-b.value);
        var circles = this.tiles.filter( (tile: Tile)=> tile.suit==TILE_SUIT.CIRCLE ).sort((a,b) => a.value-b.value);
        var honors = this.tiles.filter( (tile: Tile)=> tile.suit==TILE_SUIT.HONOR ).sort((a,b) => a.value-b.value);
        this.tiles = [...characters, ...circles, ...bamboos, ...honors];
    }
    createCombined(otherSet: TileSet): TileSet{
        return new TileSet([...this.tiles, ...otherSet.tiles]);
    }
    addTiles(otherSet: TileSet){
        this.tiles.push(...otherSet.tiles);
    }
    removeTiles(start: number, end: number): TileSet{
        let result = this.tiles.slice(start, end);
        this.tiles = [
            ...this.tiles.slice(0, start),
            ...this.tiles.slice(end, this.tiles.length),
        ];
        return new TileSet(result);
    }
    removeTile(index: number): Tile {
        let result = this.tiles[index];
        this.tiles = [
            ...this.tiles.slice(0, index),
            ...this.tiles.slice(index+1, this.tiles.length),
        ]
        return result;
    }
    removeLastTile(): Tile {
        let result = this.tiles.pop();
        if(result){
            return result;
        }
        // BAD LOGIC TO HANDLE TYPESCRIPT
        return new Tile(TILE_SUIT.BAMBOO, 1);
    }
}

class Player{
    seatWind: WIND_DIRECTION;
    handClosed: TileSet;
    handOpen: TileSet;
    discardPile: TileSet;
    isRiichi: boolean;
    riichiIndex: number;
    drawnTile: Tile|null;
    _allDiscards: TileSet;

    constructor(){
        this.seatWind = WIND_DIRECTION.EAST;
        this.handClosed = new TileSet([]);
        this.handOpen = new TileSet([]);
        this.discardPile = new TileSet([]);
        this.isRiichi = false;
        this.riichiIndex = -1;
        this.drawnTile = null;
        this._allDiscards = new TileSet([]);
    }
    drawTile(tile: Tile){
        if(this.drawnTile){
            throw new Error(`Player already has a tile and cannot draw another.`);
        }
        this.drawnTile = tile;
    }
    _discardFromHand(tileIndex: number){
        var tile = this.handClosed.removeTile(tileIndex);
        if(this.drawnTile != null){
            this.handClosed.addTiles(new TileSet([this.drawnTile]));
        }else{
            // ERROR
        }
        this.drawnTile = null;
        this.discardPile.addTiles(new TileSet([tile]));
        this._allDiscards.addTiles(new TileSet([tile]));
    }
    _discardDrawnTile(){
        if(this.drawnTile != null){
            var tile = this.drawnTile;
            this.drawnTile = null;
            this.discardPile.addTiles(new TileSet([tile]));
            this._allDiscards.addTiles(new TileSet([tile]));
        }else{
            // ERROR
        }
    }
    discardTile(tileIndex: number){
        if(tileIndex == -1){
            this._discardDrawnTile();
        }else{
            this._discardFromHand(tileIndex);
        }
    }
    chii(tile: Tile){
        // Call to complete a sequence from the last discard of the
        // player who immediately played before this one.
    }
    pon(tile: Tile){
        // Call to complete a triplet from the last discard of any
        // player.
    }
    kan(tile: Tile){
        // Call to complete a set of 4 from the last discard of any
        // player. Kans can be made from completed triplets that are
        // in the player's hands or have been pon'ed already.
    }
    ron(tile: Tile){
        // Call to complete a hand when the player is in Tenpai and
        // any other player has discarded the piece needed to win.
    }
    tsumo(){
        // Call to complete the hand when the player draws the tile
        // they need to complete it.
    }
}

class Game{
    players: Player[];
    wall: TileSet;
    doraIndicator: Tile;
    roundWind: WIND_DIRECTION;
    deck: TileSet;
    tilesPerHand: number;
    playerIndex: number;

    constructor(){
        let deckBuilderStandard = new DeckBuilderStandard();
        this.deck = deckBuilderStandard.build();
        this.tilesPerHand = 13;
        this.roundWind = WIND_DIRECTION.EAST;
        this.doraIndicator = new Tile(TILE_SUIT.BAMBOO, 1);
        this.wall = new TileSet([]);
        this.players = [
            new Player(),
            new Player(),
            new Player(),
            new Player(),
        ];
        this.playerIndex = 0;
    }

    initialize(){
        this.deck.shuffle();
        for( const p of this.players ){
            p.handClosed.addTiles(this.deck.removeTiles(0, this.tilesPerHand));
            p.handClosed.sort();
        }
        this.doraIndicator = this.deck.removeTiles(0,1).tiles[0];
        this.wall = this.deck;
        this.playerDrawTile();
    }

    playerDrawTile(){
        let player: Player = this.players[this.playerIndex];
        if(this.deck.tiles){
            let tile = this.deck.removeLastTile();
            player.drawTile(tile);
        }else{
            // ERROR
        }
    }
    nextPlayer(){
        this.playerIndex += 1;
        if(this.playerIndex >= this.players.length){
            this.playerIndex = 0;
        }
        this.playerDrawTile();
    }
    _wrap(value:number, min:number, max:number){
        var v = value;
        while(v < min){
            v = max-(min-v)+1;
        }
        while(v > max){
            v = min+(v-max)-1;
        }
        return v;
    }
    _previousPlayer(){
        return this.players[this._wrap(this.playerIndex-1, 0, this.players.length-1)];
    }
    playerActionChii(tile: Tile){
        let previous = this._previousPlayer();
        let player = this.players[this.playerIndex];
        
        // We need to keep track of this tile so that we can know when the
        // previous player is in furiten.
        if(previous.discardPile.tiles){
            player.chii(previous.discardPile.removeLastTile());
        }else{
            // ERROR
        }
    }
    playerActionPon(){}
    playerActionKan(){}
    playerActionRon(){}
    playerActionTsumo(){}
    playerActionDiscard(tileIndex: number){
        this.players[this.playerIndex].discardTile(tileIndex);
    }

}

class TileSetParserNumberLetter {
    markerCharacter: string;
    markerBamboo: string;
    markerCircle: string;
    markerHonor: string;
    DIGITS = '0123456789';

    constructor(markerCharacter: string='m', markerBamboo: string='s', markerCircle: string='p', markerHonor: string='z'){
        this.markerCharacter = markerCharacter;
        this.markerBamboo = markerBamboo;
        this.markerCircle = markerCircle;
        this.markerHonor = markerHonor;
    }

    getCharacterToSuitMap(){
        return new Map([
            [this.markerCharacter, TILE_SUIT.CHARACTER],
            [this.markerBamboo, TILE_SUIT.BAMBOO],
            [this.markerCircle, TILE_SUIT.CIRCLE],
            [this.markerHonor, TILE_SUIT.HONOR],
        ]);
    }

    parseTileSet(text: string):TileSet{
        let character_to_suit_map = this.getCharacterToSuitMap();
        var tiles = [];
        for(let i=0, l=text.length; i<l; i+=2){
            var value = parseInt(text[i]);
            var suit = character_to_suit_map.get(text[i+1])!;
            var isSpecial = false;
            // 0 is considered a "red" or "dotted" piece
            // this only happens on pieces with a value of 5
            if(value == 0){
                isSpecial = true;
                value = 5;
            }
            tiles.push(new Tile(suit, value, isSpecial));
        }
        return new TileSet(tiles);
    }
}

class TileSetParserGroupedBySuit {

    numberLetterParser: TileSetParserNumberLetter;

    constructor(){
        this.numberLetterParser = new TileSetParserNumberLetter();
    }

    _buildTiles(numbers: number[], suit: TILE_SUIT):Tile[]{
        var tiles = [];
        for( let i=0, l=numbers.length; i<l; i+=1 ){
            let n = numbers[i];
            if(n == 0){
                tiles.push(new Tile(suit, 5, true));
            }else{
                tiles.push(new Tile(suit, n));
            }
        }
        return tiles;
    }

    parseTileSet(text: String):TileSet{
        let DIGITS = this.numberLetterParser.DIGITS;
        let SUIT_MAP = this.numberLetterParser.getCharacterToSuitMap();
        var numbers = [];
        var expandedNotation = '';
        for( let i=0, l=text.length; i<l; i+=1 ){
            let char = text[i];
            if( DIGITS.indexOf(char) > -1 ){
                numbers.push(char);
                continue;
            }
            if(SUIT_MAP.has(char)){
                expandedNotation += numbers.join(char)+char;
                numbers = [];
            }
        }
        return this.numberLetterParser.parseTileSet(expandedNotation);
    }
}

class TileSetPrinter{
    printTileSet(tileSet: TileSet): string {
        return 'NOT IMPLEMENTED';
    }
}

class TileSetPrinterVerbose extends TileSetPrinter {
    getSuitNameMap(){
        return new Map([
            [TILE_SUIT.BAMBOO, 'bamboo'],
            [TILE_SUIT.CIRCLE, 'circles'],
            [TILE_SUIT.CHARACTER, 'characters'],
        ])
    }
    getValueNameMap(){
        return new Map([
            [1, 'one'],
            [2, 'two'],
            [3, 'three'],
            [4, 'four'],
            [5, 'five'],
            [6, 'six'],
            [7, 'seven'],
            [8, 'eight'],
            [9, 'nine'],
        ])
    }
    getHonorNameMap(){
        return new Map([
            [1, 'east wind'],
            [2, 'south wind'],
            [3, 'north wind'],
            [4, 'west wind'],
            [5, 'white dragon'],
            [6, 'green dragon'],
            [7, 'red dragon'],
        ]);
    }
    printTileSet(tileSet: TileSet):string{
        let suitNameMap = this.getSuitNameMap();
        let valueNameMap = this.getValueNameMap();
        let honorNameMap = this.getHonorNameMap();
        var result = '';
        for(const tile of tileSet.tiles){
            if(suitNameMap.has(tile.suit)){
                let suitName = suitNameMap.get(tile.suit);
                if(valueNameMap.has(tile.value)){
                    let valueName = valueNameMap.get(tile.value);
                    result += `${valueName} of ${suitName}\n`;
                    continue;
                }else{
                    // error
                }
            }
            // This is something special like dragon/winds
            if(tile.suit == TILE_SUIT.HONOR){
                result += `${honorNameMap.get(tile.value)}\n`;
            }
        }
        return result;
    }
}

class TileSetPrinterCompact extends TileSetPrinter {
    getSuitNameMap(){
        return new Map([
            [TILE_SUIT.BAMBOO, 's'],
            [TILE_SUIT.CIRCLE, 'p'],
            [TILE_SUIT.CHARACTER, 'm'],
            [TILE_SUIT.HONOR, 'h'],
        ])
    }
    getValueNameMap(){
        return new Map([
            [0, '5'], // because it's the special red/dotted 5
            [1, '1'],
            [2, '2'],
            [3, '3'],
            [4, '4'],
            [5, '5'],
            [6, '6'],
            [7, '7'],
            [8, '8'],
            [9, '9'],
        ])
    }
    printTileSet(tileSet: TileSet):string{
        let suitNameMap = this.getSuitNameMap();
        let valueNameMap = this.getValueNameMap();
        var result = '';
        for(const tile of tileSet.tiles){
            if(suitNameMap.has(tile.suit)){
                let suitName = suitNameMap.get(tile.suit);
                if(valueNameMap.has(tile.value)){
                    let valueName = valueNameMap.get(tile.value);
                    result += `${valueName}${suitName}`;
                    continue;
                }else{
                    // error
                }
            }
        }
        return result;
    }
}
class TilePrinter {
    printTile(tile: Tile){
        return 'NOT IMPLEMENTED'
    }
}
class TilePrinterUnicode extends TilePrinter {
    getTileUnicodeMap(){
        return new Map([
            [TILE_SUIT.BAMBOO, new Map([
                [1, '\u{1f010}'],
                [2, '\u{1f011}'],
                [3, '\u{1f012}'],
                [4, '\u{1f013}'],
                [5, '\u{1f014}'],
                [6, '\u{1f015}'],
                [7, '\u{1f016}'],
                [8, '\u{1f017}'],
                [9, '\u{1f018}']
            ])],
            [TILE_SUIT.CIRCLE, new Map([
                [1, '\u{1f019}'],
                [2, '\u{1f01A}'],
                [3, '\u{1f01B}'],
                [4, '\u{1f01C}'],
                [5, '\u{1f01D}'],
                [6, '\u{1f01E}'],
                [7, '\u{1f01F}'],
                [8, '\u{1f020}'],
                [9, '\u{1f021}']
            ])],
            [TILE_SUIT.CHARACTER, new Map([
                [1, '\u{1f007}'],
                [2, '\u{1f008}'],
                [3, '\u{1f009}'],
                [4, '\u{1f00A}'],
                [5, '\u{1f00B}'],
                [6, '\u{1f00C}'],
                [7, '\u{1f00D}'],
                [8, '\u{1f00E}'],
                [9, '\u{1f00F}']
            ])],
            [TILE_SUIT.HONOR, new Map([
                [1, '\u{1f000}'], // east
                [2, '\u{1f001}'], // south
                [3, '\u{1f002}'], // west
                [4, '\u{1f003}'], // north
                [5, '\u{1f006}'], // white
                [6, '\u{1f005}'], // green
                [7, '\u{1f004}'], // red
            ])],
        ])
    }
    printTile(tile: Tile): string{
        let nameMap = this.getTileUnicodeMap();
        let valueForSuitMap = nameMap.get(tile.suit)!;
        let result = valueForSuitMap.get(tile.value);
        // handle undefined from .get() error
        if(! result){
            return ''
        }
        return result;
    }
}

class TileSetPrinterUnicode extends TileSetPrinter {
    getTileUnicodeMap(){
        return new Map([
            [TILE_SUIT.BAMBOO, new Map([
                [1, '\u{1f010}'],
                [2, '\u{1f011}'],
                [3, '\u{1f012}'],
                [4, '\u{1f013}'],
                [5, '\u{1f014}'],
                [6, '\u{1f015}'],
                [7, '\u{1f016}'],
                [8, '\u{1f017}'],
                [9, '\u{1f018}']
            ])],
            [TILE_SUIT.CIRCLE, new Map([
                [1, '\u{1f019}'],
                [2, '\u{1f01A}'],
                [3, '\u{1f01B}'],
                [4, '\u{1f01C}'],
                [5, '\u{1f01D}'],
                [6, '\u{1f01E}'],
                [7, '\u{1f01F}'],
                [8, '\u{1f020}'],
                [9, '\u{1f021}']
            ])],
            [TILE_SUIT.CHARACTER, new Map([
                [1, '\u{1f007}'],
                [2, '\u{1f008}'],
                [3, '\u{1f009}'],
                [4, '\u{1f00A}'],
                [5, '\u{1f00B}'],
                [6, '\u{1f00C}'],
                [7, '\u{1f00D}'],
                [8, '\u{1f00E}'],
                [9, '\u{1f00F}']
            ])],
            [TILE_SUIT.HONOR, new Map([
                [1, '\u{1f000}'], // east
                [2, '\u{1f001}'], // south
                [3, '\u{1f002}'], // west
                [4, '\u{1f003}'], // north
                [5, '\u{1f006}'], // white
                [6, '\u{1f005}'], // green
                [7, '\u{1f004}'], // red
            ])],
        ])
    }
    printTileSet(tileSet: TileSet):string{
        let nameMap = this.getTileUnicodeMap();
        var result = '';
        for(const tile of tileSet.tiles){
            let valueForSuitMap = nameMap.get(tile.suit)!;
            result += valueForSuitMap.get(tile.value);
        }
        return result;
    }
}

// Main
var parser = new TileSetParserGroupedBySuit();
var hand = parser.parseTileSet('123m045s789p148z');

class DeckBuilderStandard {
    build(){
        var mahjongDeckString = '';
        mahjongDeckString += '123406789m';
        mahjongDeckString += '123456789m';
        mahjongDeckString += '123456789m';
        mahjongDeckString += '123456789m';
        mahjongDeckString += '123406789s';
        mahjongDeckString += '123456789s';
        mahjongDeckString += '123456789s';
        mahjongDeckString += '123456789s';
        mahjongDeckString += '123406789p';
        mahjongDeckString += '123456789p';
        mahjongDeckString += '123456789p';
        mahjongDeckString += '123456789p';
        mahjongDeckString += '1234567z';
        mahjongDeckString += '1234567z';
        mahjongDeckString += '1234567z';
        mahjongDeckString += '1234567z';
        
        return parser.parseTileSet(mahjongDeckString);
    }
}

class GamePrinter{
    tileSetPrinter: TileSetPrinter;
    constructor(){
        this.tileSetPrinter = new TileSetPrinterCompact();
    }
    printGame(game: Game){
        let tileSetPrinter = this.tileSetPrinter;
        var result = '';
        result += `Round Wind: ${game.roundWind}\n`;
        result += `Wall: ${tileSetPrinter.printTileSet(game.wall)}\n\n`;
        for(let i=0, l=game.players.length; i<l; i+=1){
            let player = game.players[i];
            result += `Player[${i}]:\n`;
            result += `  Closed Hand: ${tileSetPrinter.printTileSet(player.handClosed)}`;
            if(player.drawnTile){
                result += ` | ${tileSetPrinter.printTileSet(new TileSet([player.drawnTile]))}`
            }
            result += '\n';
            result += `  Open Hand: ${tileSetPrinter.printTileSet(player.handOpen)}\n`;
            result += `  Discards: ${tileSetPrinter.printTileSet(player.discardPile)}\n`;
            result += `  Seat Wind: ${player.seatWind}\n`;
            result += '\n';
        }
        return result;
    }
}

class Yaku {
}
class YakuYakuhai extends Yaku {
    // Yakuhai are pons of the round wind, your seat wind, and the
    // colored honors chun, haku and hatsu. The rest of the hand
    // can be anything.
    playerMatches(game: Game, player: Player): boolean{
        let allowedTriplets = [
            new Tile(TILE_SUIT.HONOR, game.roundWind),
            new Tile(TILE_SUIT.HONOR, player.seatWind),
            new Tile(TILE_SUIT.HONOR, DRAGON.WHITE),
            new Tile(TILE_SUIT.HONOR, DRAGON.GREEN),
            new Tile(TILE_SUIT.HONOR, DRAGON.RED),
        ];
        for(const reference of allowedTriplets){
            if( player.handOpen.hasTripletOf(reference) ){ return true; }
            if( player.handClosed.hasTripletOf(reference) ){ return true; }
        }
        return false;
    }
}
class YakuRiichi extends Yaku {
    playerMatches(game: Game, player: Player): boolean {
        return player.isRiichi;
    }
}
class YakuTanYau extends Yaku {
    // Tan yao is when the hand is made from suited tiles from 2-8
    // That means no 1's, 9's or honor tiles.
    playerMatches(game: Game, player: Player): boolean {
        if(player.handClosed.hasSuitOfAnyValue(TILE_SUIT.HONOR)){return false;}
        if(player.handOpen.hasSuitOfAnyValue(TILE_SUIT.HONOR)){return false;}
        if(player.handClosed.hasValueInAnySuit(1)){return false;}
        if(player.handOpen.hasValueInAnySuit(1)){return false;}
        if(player.handClosed.hasValueInAnySuit(9)){return false;}
        if(player.handOpen.hasValueInAnySuit(9)){return false;}
        return true;
    }
}

class YakuChanta extends Yaku {
    // All of your meld must contain at least one terminal (1 or 9)
    // or honor suit.
}

var deckBuilderStandard = new DeckBuilderStandard();
var standardDeck = deckBuilderStandard.build();
standardDeck.shuffle()
console.info(standardDeck);

var printer = new TileSetPrinterUnicode();
console.info(printer.printTileSet(standardDeck));

var game = new Game();
game.initialize();
var gamePrinter = new GamePrinter();
console.info(gamePrinter.printGame(game));

// var yakuChecker = new YakuYakuhai();
// console.info(yakuChecker.playerMatches(game, game.players[0]));
// game.players[1].handOpen.addTiles(new TileSet([
//     new Tile(TILE_SUIT.HONOR, WIND_DIRECTION.WEST),
//     new Tile(TILE_SUIT.HONOR, WIND_DIRECTION.WEST),
//     new Tile(TILE_SUIT.HONOR, WIND_DIRECTION.WEST),
// ]));
// console.info(yakuChecker.playerMatches(game, game.players[1]));

// var yakuChecker = new YakuTanYau();
// console.info(yakuChecker.playerMatches(game, game.players[0]));
// game.players[2].handClosed = new TileSet([
//     new Tile(TILE_SUIT.BAMBOO, 2),
//     new Tile(TILE_SUIT.BAMBOO, 3),
//     new Tile(TILE_SUIT.BAMBOO, 4),
//     new Tile(TILE_SUIT.BAMBOO, 5),
//     new Tile(TILE_SUIT.BAMBOO, 6),
//     new Tile(TILE_SUIT.BAMBOO, 7),
//     new Tile(TILE_SUIT.CIRCLE, 2),
//     new Tile(TILE_SUIT.CIRCLE, 3),
//     new Tile(TILE_SUIT.CIRCLE, 4),
//     new Tile(TILE_SUIT.CHARACTER, 6),
//     new Tile(TILE_SUIT.CHARACTER, 7),
//     new Tile(TILE_SUIT.CHARACTER, 8),
//     new Tile(TILE_SUIT.CHARACTER, 5),
//     new Tile(TILE_SUIT.CHARACTER, 5),
// ]);
// console.info(yakuChecker.playerMatches(game, game.players[2]));
// For every suit (3x) there are:
//  - 7 sequences (1,2,3; 2,3,4; ...; 7,8,9)
//  - 9 triplets (1,1,1; 2,2,2; ...; 9,9,9)
//  - 9 pairs, 9 quads
// For the honors there are:
//  - 7 triplets, 7 pairs, 7 quads
// To brute-force check for all possible pairs/triplets/quads
// and 3-sequences requires 3*(7+9+9+9) + 7+7+7 = 3*34+21 = 123
// checks.
// Looking at only 3-sequences and triplets:
// 3*7 = 21 sequences
// 9*3+7 = 34 triplets
// => 55 potential melds

class MeldAnalyzer {
    generateAllMelds():TileSet[]{
        return [
            ...this.generateSequenceMelds(),
            ...this.generateTripletMelds(),
            ...this.generatePairMelds(),
        ]
    }
    generateSequenceMelds():TileSet[]{
        let sequenceSuits = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        var sequenceMelds:TileSet[] = [];
        for(const suit of sequenceSuits){
            for(let i=1; i<8; i+=1){
                sequenceMelds.push(new TileSet([
                    new Tile(suit, i),
                    new Tile(suit, i+1),
                    new Tile(suit, i+2),
                ]));
            }
        }
        return sequenceMelds;
    }
    generateTripletMelds():TileSet[]{
        let sequenceSuits = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        var tripletMelds:TileSet[] = [];
        for(const suit of sequenceSuits){
            for(let i=1; i<10; i+=1){
                tripletMelds.push(new TileSet([
                    new Tile(suit, i),
                    new Tile(suit, i),
                    new Tile(suit, i),
                ]));
            }
        }
        // Honors
        for(let i=1; i<8; i+=1){
            tripletMelds.push(new TileSet([
                new Tile(TILE_SUIT.HONOR, i),
                new Tile(TILE_SUIT.HONOR, i),
                new Tile(TILE_SUIT.HONOR, i),
            ]));
        }
        return tripletMelds;
    }
    generatePairMelds():TileSet[]{
        let tripletMelds = this.generateTripletMelds();
        for(const meld of tripletMelds){
            meld.removeTiles(0,0);
        }
        return tripletMelds;
    }
    computePotentialMelds(tileSet: TileSet){
        // const melds = this.generateAllMelds();
        const melds = [
            ...this.generateSequenceMelds(),
            ...this.generateTripletMelds(),
        ];
        const meldScores = new Map();
        // Get all melds that are 1 or 0 away
        for(const meld of melds){
            let missingTiles = tileSet.listMissingFrom(meld);
            let score = missingTiles.tiles.length;
            if(!meldScores.has(score)){
                meldScores.set(score, []);
            }
            let group = meldScores.get(score);
            // Keep track of missing tiles?
            // group.push(missingTiles);
            // Or the actual meld?
            group.push(meld);
            meldScores.set(score, group);
        }
        return meldScores;
    }

    printScores(scores: Map<number, TileSet[]>){
        let printer = new TileSetPrinterUnicode();
        var result = '';
        for(const entry of scores){
            let score = entry[0];
            let melds = entry[1];
            result += `Score: ${score}\n`;
            for(const meld of melds){
                result += `  ${printer.printTileSet(meld)}\n`;
            }
        }
        return result;
    }
}

class HandAnalyzer {
    _generateAllSequenceMelds(tile: Tile){
        let melds = [];
        if(tile.value < 8){
            melds.push(new TileSet([
                new Tile(tile.suit, tile.value),
                new Tile(tile.suit, tile.value+1),
                new Tile(tile.suit, tile.value+2),
            ]));
        }
        if(tile.value > 2){
            melds.push(new TileSet([
                new Tile(tile.suit, tile.value-2),
                new Tile(tile.suit, tile.value-1),
                new Tile(tile.suit, tile.value),
            ]));
        }
        if(tile.value != 1 && tile.value != 9){
            melds.push(new TileSet([
                new Tile(tile.suit, tile.value-1),
                new Tile(tile.suit, tile.value),
                new Tile(tile.suit, tile.value+1),
            ]));
        }
        return melds;
    }
    _generateTripletMelds(tile: Tile){
        let melds = [];
        melds.push(new TileSet([
            new Tile(tile.suit, tile.value),
            new Tile(tile.suit, tile.value),
            new Tile(tile.suit, tile.value),
        ]));
        return melds;
    }
    meldsForTile(tile: Tile){
        let melds = [];
        let sequenceSuits = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        if(sequenceSuits.indexOf(tile.suit) > -1){
            melds.push(...this._generateAllSequenceMelds(tile));
        }
        melds.push(...this._generateTripletMelds(tile));
        return melds;
    }
    analyze(tileSet: TileSet){
        let results: Map<Tile, TileSet[]> = new Map();
        for(let tile of tileSet.tiles){
            results.set(tile, this.meldsForTile(tile));
        }
        return results;
    }
    countTileSetsWithTile(tile: Tile, tileSets: TileSet[]){
        let count = 0;
        for(let tileSet of tileSets){
            if(tileSet.has(tile)){
                count += 1;
            }
        }
        return count;
    }
    keepCount(tileSet: TileSet){
        let handMeldsPerTile = [];
        for(let tile of tileSet.tiles){
            handMeldsPerTile.push(this.meldsForTile(tile));
        }
        let scores = [];
        for(let i=0, l=tileSet.tiles.length; i<l; i+=1){
            scores.push(this.countTileSetsWithTile(tileSet.tiles[i], handMeldsPerTile[i]));
        }
        return scores;
    }
}

class AnalyzerTenpai {
    isMeld(tileSet: TileSet){
        // Multiple suits are not a meld
        let suitsInSet = [...tileSet.listSuits()];
        if(suitsInSet.length > 1){
            return false;
        }
        
        // Is triplet?
        if( tileSet.count(tileSet.tiles[0]) == tileSet.tiles.length ){
            return true;
        }
        
        // Is sequence?
        for(let i=0, l=tileSet.tiles.length-1; i<l; i+=1){
            let tile = tileSet.tiles[i];
            let next = tileSet.tiles[i+1];
            if(tile.value+1 != next.value){
                return false;
            }
        }
        return true;
    }
    listMelds(tileSet: TileSet, meldSize: number=3):TileSet[] {
        let hand = new TileSet(tileSet.tiles);
        hand.sort();
        let melds = [];
        for(let i=0, l=hand.tiles.length-meldSize; i<l; i+=1){
            let group = new TileSet(hand.tiles.slice(i,i+meldSize));
            if(this.isMeld(group)){
                melds.push(group);
            }
        }
        return melds;
    }
}
// for a given hand -- you have 13 tiles
// you can compute all possible melds that it can make
// tails (1+9) -> sequence+triplet
// middles (2-8, n) -> 3 sequence (n-,n,n+; n--,n-,n; n,n+,n++) + triplet
// honors -> triplet
// for 13 tiles that's a maximum count 4x13 = 52
// minimum count: 13

var parser = new TileSetParserGroupedBySuit();
var simpleMeld = parser.parseTileSet('12m');
var targetMeld = parser.parseTileSet('123m');
console.info(simpleMeld.listMissingFrom(targetMeld));

var analyzer = new MeldAnalyzer();
var scores = analyzer.computePotentialMelds(game.players[3].handClosed);
console.info(printer.printTileSet(game.players[3].handClosed));
console.info(analyzer.printScores(scores));

// 1m2m4m6m
// 1m2m3m
// 2m3m4m
// 4m5m6m
// 7m8m9m
// Find all sets that are 1 tile away or less
// Build all possible melds
// compute the missing sets from each
// keep the sets that are missing 1 or fewer tiles
// from the list that are missing 1 or fewer tiles:
//   list all the unique tiles
//   count the number of groups a particular tile appears in

console.info(game);
console.info(gamePrinter);
// var verbosePrinter = new TileSetPrinterVerbose();
// console.info(verbosePrinter);
var tilePrinter = new TilePrinterUnicode();

var ha = new HandAnalyzer();
console.info(game.players[0].handClosed)
console.info(ha.keepCount(game.players[0].handClosed));
var analysis = ha.analyze(game.players[0].handClosed);
for( let tile of analysis.keys() ){
    let tileSets = analysis.get(tile);
    console.info((new TilePrinterUnicode()).printTile(tile));
    if(tileSets){
        for( let tileSet of tileSets ){
            let missing = game.players[0].handClosed.listMissingFrom(tileSet);
            console.info(`${(new TileSetPrinterCompact()).printTileSet(tileSet)} -- missing: ${missing.tiles.length}` );
        }
    }else{
        // ERROR!
    }
}

// var ta = new AnalyzerTenpai();
// console.info(ta.listMelds(game.players[0].handClosed));


// Some additional reading:
// http://blog.ezyang.com/2014/04/calculating-shanten-in-mahjong/
// https://stackoverflow.com/questions/4239028/how-do-i-calculate-the-shanten-number-in-mahjong
// https://github.com/tomohxx/shanten-number
// https://en.wikipedia.org/wiki/List_of_knapsack_problems
// http://hjemmesider.diku.dk/~pisinger/95-1.pdf
