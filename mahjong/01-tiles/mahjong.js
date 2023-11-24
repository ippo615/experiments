"use strict";
var TILE_SUIT;
(function (TILE_SUIT) {
    TILE_SUIT[TILE_SUIT["CHARACTER"] = 0] = "CHARACTER";
    TILE_SUIT[TILE_SUIT["BAMBOO"] = 1] = "BAMBOO";
    TILE_SUIT[TILE_SUIT["CIRCLE"] = 2] = "CIRCLE";
    TILE_SUIT[TILE_SUIT["HONOR"] = 3] = "HONOR";
})(TILE_SUIT || (TILE_SUIT = {}));
var WIND_DIRECTION;
(function (WIND_DIRECTION) {
    WIND_DIRECTION[WIND_DIRECTION["EAST"] = 1] = "EAST";
    WIND_DIRECTION[WIND_DIRECTION["SOUTH"] = 2] = "SOUTH";
    WIND_DIRECTION[WIND_DIRECTION["WEST"] = 3] = "WEST";
    WIND_DIRECTION[WIND_DIRECTION["NORTH"] = 4] = "NORTH";
})(WIND_DIRECTION || (WIND_DIRECTION = {}));
var DRAGON;
(function (DRAGON) {
    DRAGON[DRAGON["WHITE"] = 5] = "WHITE";
    DRAGON[DRAGON["GREEN"] = 6] = "GREEN";
    DRAGON[DRAGON["RED"] = 7] = "RED";
})(DRAGON || (DRAGON = {}));
class Tile {
    constructor(suit, value, isSpecial = false) {
        this.suit = suit;
        this.value = value;
        this.isSpecial = isSpecial;
    }
    equals(other, checkSpecial = false) {
        if (this.suit != other.suit) {
            return false;
        }
        if (this.value != other.value) {
            return false;
        }
        if (checkSpecial) {
            return (this.isSpecial == other.isSpecial);
        }
        return true;
    }
}
class TileSet {
    constructor(tiles) {
        this.tiles = tiles;
    }
    has(tile) {
        for (const other of this.tiles) {
            if (tile.equals(other)) {
                return true;
            }
        }
        return false;
    }
    hasPairOf(tile) {
        return this.count(tile) >= 2;
    }
    hasTripletOf(tile) {
        return this.count(tile) >= 3;
    }
    hasSuitOfAnyValue(suit) {
        for (const tile of this.tiles) {
            if (tile.suit == suit) {
                return true;
            }
        }
        return false;
    }
    listMissingFrom(other) {
        var missingTiles = [];
        var visittedTiles = new TileSet([]);
        for (const tile of other.tiles) {
            if (visittedTiles.has(tile)) {
                continue;
            }
            let otherCount = other.count(tile);
            let thisCount = this.count(tile);
            let missing = otherCount - thisCount;
            if (missing > 0) {
                for (let i = 0; i < missing; i += 1) {
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
    hasValueInAnySuit(value) {
        let suitsToCheck = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        for (const suit of suitsToCheck) {
            var tiles = this.tiles.filter((tile) => tile.suit == suit);
            for (const tile of tiles) {
                if (tile.value == value) {
                    return true;
                }
            }
        }
        return false;
    }
    listSuits() {
        var suits = new Set();
        for (const tile of this.tiles) {
            suits.add(tile.suit);
        }
        return suits;
    }
    count(tile) {
        let matches = this.tiles.filter((other) => tile.equals(other));
        return matches.length;
    }
    shuffle() {
        var shuffled = this.tiles
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        this.tiles = shuffled;
    }
    sort() {
        var bamboos = this.tiles.filter((tile) => tile.suit == TILE_SUIT.BAMBOO).sort((a, b) => a.value - b.value);
        var characters = this.tiles.filter((tile) => tile.suit == TILE_SUIT.CHARACTER).sort((a, b) => a.value - b.value);
        var circles = this.tiles.filter((tile) => tile.suit == TILE_SUIT.CIRCLE).sort((a, b) => a.value - b.value);
        var honors = this.tiles.filter((tile) => tile.suit == TILE_SUIT.HONOR).sort((a, b) => a.value - b.value);
        this.tiles = [...characters, ...circles, ...bamboos, ...honors];
    }
    createCombined(otherSet) {
        return new TileSet([...this.tiles, ...otherSet.tiles]);
    }
    addTiles(otherSet) {
        this.tiles.push(...otherSet.tiles);
    }
    removeTiles(start, end) {
        let result = this.tiles.slice(start, end);
        this.tiles = [
            ...this.tiles.slice(0, start),
            ...this.tiles.slice(end, this.tiles.length),
        ];
        return new TileSet(result);
    }
    removeTile(index) {
        let result = this.tiles[index];
        this.tiles = [
            ...this.tiles.slice(0, index),
            ...this.tiles.slice(index+1, this.tiles.length),
        ]
        return result;
    }
    removeLastTile() {
        let result = this.tiles.pop();
        return result;
    }
}
class Player {
    constructor() {
        this.seatWind = WIND_DIRECTION.EAST;
        this.handClosed = new TileSet([]);
        this.handOpen = new TileSet([]);
        this.discardPile = new TileSet([]);
        this.isRiichi = false;
        this.riichiIndex = -1;
        this.drawnTile = null;
        this._allDiscards = new TileSet([]);
    }
    drawTile(tile) {
        if (this.drawnTile) {
            throw new Error(`Player already has a tile and cannot draw another.`);
        }
        this.drawnTile = tile;
    }
    _discardFromHand(tileIndex) {
        var tile = this.handClosed.removeTile(tileIndex);
        if (this.drawnTile != null) {
            this.handClosed.addTiles(new TileSet([this.drawnTile]));
        }
        else {
            // ERROR
        }
        this.drawnTile = null;
        this.discardPile.addTiles(new TileSet([tile]));
        this._allDiscards.addTiles(new TileSet([tile]));
    }
    _discardDrawnTile() {
        if (this.drawnTile != null) {
            var tile = this.drawnTile;
            this.drawnTile = null;
            this.discardPile.addTiles(new TileSet([tile]));
            this._allDiscards.addTiles(new TileSet([tile]));
        }
        else {
            // ERROR
        }
    }
    discardTile(tileIndex) {
        if (tileIndex == -1) {
            this._discardDrawnTile();
        }
        else {
            this._discardFromHand(tileIndex);
        }
    }
    chii(tile) {
        // Call to complete a sequence from the last discard of the
        // player who immediately played before this one.
    }
    pon(tile) {
        // Call to complete a triplet from the last discard of any
        // player.
    }
    kan(tile) {
        // Call to complete a set of 4 from the last discard of any
        // player. Kans can be made from completed triplets that are
        // in the player's hands or have been pon'ed already.
    }
    ron(tile) {
        // Call to complete a hand when the player is in Tenpai and
        // any other player has discarded the piece needed to win.
    }
    tsumo() {
        // Call to complete the hand when the player draws the tile
        // they need to complete it.
    }
}
class Game {
    constructor() {
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
    initialize() {
        this.deck.shuffle();
        for (const p of this.players) {
            p.handClosed.addTiles(this.deck.removeTiles(0, this.tilesPerHand));
            p.handClosed.sort();
        }
        this.doraIndicator = this.deck.removeTiles(0, 1).tiles[0];
        this.wall = this.deck;
        this.playerDrawTile();
    }
    playerDrawTile() {
        let player = this.players[this.playerIndex];
        let tile = this.deck.removeLastTile();
        player.drawTile(tile);
    }
    nextPlayer() {
        this.playerIndex += 1;
        if (this.playerIndex >= this.players.length) {
            this.playerIndex = 0;
        }
        this.playerDrawTile();
    }
    _wrap(value, min, max) {
        var v = value;
        while (v < min) {
            v = max - (min - v) + 1;
        }
        while (v > max) {
            v = min + (v - max) - 1;
        }
        return v;
    }
    _previousPlayer() {
        return this.players[this._wrap(this.playerIndex - 1, 0, this.players.length - 1)];
    }
    playerActionChii(tile) {
        let previous = this._previousPlayer();
        let player = this.players[this.playerIndex];
        // We need to keep track of this tile so that we can know when the
        // previous player is in furiten.
        player.chii(previous.discardPile.removeLastTile());
    }
    playerActionPon() { }
    playerActionKan() { }
    playerActionRon() { }
    playerActionTsumo() { }
    playerActionDiscard(tileIndex) {
        this.players[this.playerIndex].discardTile(tileIndex);
    }
}
class TileSetParserNumberLetter {
    constructor(markerCharacter = 'm', markerBamboo = 's', markerCircle = 'p', markerHonor = 'z') {
        this.DIGITS = '0123456789';
        this.markerCharacter = markerCharacter;
        this.markerBamboo = markerBamboo;
        this.markerCircle = markerCircle;
        this.markerHonor = markerHonor;
    }
    getCharacterToSuitMap() {
        return new Map([
            [this.markerCharacter, TILE_SUIT.CHARACTER],
            [this.markerBamboo, TILE_SUIT.BAMBOO],
            [this.markerCircle, TILE_SUIT.CIRCLE],
            [this.markerHonor, TILE_SUIT.HONOR],
        ]);
    }
    parseTileSet(text) {
        let character_to_suit_map = this.getCharacterToSuitMap();
        var tiles = [];
        for (let i = 0, l = text.length; i < l; i += 2) {
            var value = parseInt(text[i]);
            var suit = character_to_suit_map.get(text[i + 1]);
            var isSpecial = false;
            // 0 is considered a "red" or "dotted" piece
            // this only happens on pieces with a value of 5
            if (value == 0) {
                isSpecial = true;
                value = 5;
            }
            tiles.push(new Tile(suit, value, isSpecial));
        }
        return new TileSet(tiles);
    }
}
class TileSetParserGroupedBySuit {
    constructor() {
        this.numberLetterParser = new TileSetParserNumberLetter();
    }
    _buildTiles(numbers, suit) {
        var tiles = [];
        for (let i = 0, l = numbers.length; i < l; i += 1) {
            let n = numbers[i];
            if (n == 0) {
                tiles.push(new Tile(suit, 5, true));
            }
            else {
                tiles.push(new Tile(suit, n));
            }
        }
        return tiles;
    }
    parseTileSet(text) {
        let DIGITS = this.numberLetterParser.DIGITS;
        let SUIT_MAP = this.numberLetterParser.getCharacterToSuitMap();
        var numbers = [];
        var expandedNotation = '';
        for (let i = 0, l = text.length; i < l; i += 1) {
            let char = text[i];
            if (DIGITS.indexOf(char) > -1) {
                numbers.push(char);
                continue;
            }
            if (SUIT_MAP.has(char)) {
                expandedNotation += numbers.join(char) + char;
                numbers = [];
            }
        }
        return this.numberLetterParser.parseTileSet(expandedNotation);
    }
}
class TileSetPrinter {
    printTileSet(tileSet) {
        return 'NOT IMPLEMENTED';
    }
}
class TileSetPrinterVerbose extends TileSetPrinter {
    getSuitNameMap() {
        return new Map([
            [TILE_SUIT.BAMBOO, 'bamboo'],
            [TILE_SUIT.CIRCLE, 'circles'],
            [TILE_SUIT.CHARACTER, 'characters'],
        ]);
    }
    getValueNameMap() {
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
        ]);
    }
    getHonorNameMap() {
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
    printTileSet(tileSet) {
        let suitNameMap = this.getSuitNameMap();
        let valueNameMap = this.getValueNameMap();
        let honorNameMap = this.getHonorNameMap();
        var result = '';
        for (const tile of tileSet.tiles) {
            if (suitNameMap.has(tile.suit)) {
                let suitName = suitNameMap.get(tile.suit);
                if (valueNameMap.has(tile.value)) {
                    let valueName = valueNameMap.get(tile.value);
                    result += `${valueName} of ${suitName}\n`;
                    continue;
                }
                else {
                    // error
                }
            }
            // This is something special like dragon/winds
            if (tile.suit == TILE_SUIT.HONOR) {
                result += `${honorNameMap.get(tile.value)}\n`;
            }
        }
        return result;
    }
}
class TileSetPrinterCompact extends TileSetPrinter {
    getSuitNameMap() {
        return new Map([
            [TILE_SUIT.BAMBOO, 's'],
            [TILE_SUIT.CIRCLE, 'p'],
            [TILE_SUIT.CHARACTER, 'm'],
            [TILE_SUIT.HONOR, 'h'],
        ]);
    }
    getValueNameMap() {
        return new Map([
            [0, '5'],
            [1, '1'],
            [2, '2'],
            [3, '3'],
            [4, '4'],
            [5, '5'],
            [6, '6'],
            [7, '7'],
            [8, '8'],
            [9, '9'],
        ]);
    }
    printTileSet(tileSet) {
        let suitNameMap = this.getSuitNameMap();
        let valueNameMap = this.getValueNameMap();
        var result = '';
        for (const tile of tileSet.tiles) {
            if (suitNameMap.has(tile.suit)) {
                let suitName = suitNameMap.get(tile.suit);
                if (valueNameMap.has(tile.value)) {
                    let valueName = valueNameMap.get(tile.value);
                    result += `${valueName}${suitName}`;
                    continue;
                }
                else {
                    // error
                }
            }
        }
        return result;
    }
}
class TilePrinter {
    printTile(tile) {
        return 'NOT IMPLEMENTED';
    }
}
class TilePrinterUnicode extends TilePrinter {
    getTileUnicodeMap() {
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
                    [1, '\u{1f000}'],
                    [2, '\u{1f001}'],
                    [3, '\u{1f002}'],
                    [4, '\u{1f003}'],
                    [5, '\u{1f006}'],
                    [6, '\u{1f005}'],
                    [7, '\u{1f004}'], // red
                ])],
        ]);
    }
    printTile(tile) {
        let nameMap = this.getTileUnicodeMap();
        let valueForSuitMap = nameMap.get(tile.suit);
        let result = valueForSuitMap.get(tile.value);
        // handle undefined from .get() error
        if (!result) {
            return '';
        }
        return result;
    }
}
class TileSetPrinterUnicode extends TileSetPrinter {
    getTileUnicodeMap() {
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
                    [1, '\u{1f000}'],
                    [2, '\u{1f001}'],
                    [3, '\u{1f002}'],
                    [4, '\u{1f003}'],
                    [5, '\u{1f006}'],
                    [6, '\u{1f005}'],
                    [7, '\u{1f004}'], // red
                ])],
        ]);
    }
    printTileSet(tileSet) {
        let nameMap = this.getTileUnicodeMap();
        var result = '';
        for (const tile of tileSet.tiles) {
            let valueForSuitMap = nameMap.get(tile.suit);
            result += valueForSuitMap.get(tile.value);
        }
        return result;
    }
}
// Main
var parser = new TileSetParserGroupedBySuit();
var hand = parser.parseTileSet('123m045s789p148z');
class DeckBuilderStandard {
    build() {
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
class GamePrinter {
    constructor() {
        this.tileSetPrinter = new TileSetPrinterCompact();
    }
    printGame(game) {
        let tileSetPrinter = this.tileSetPrinter;
        var result = '';
        result += `Round Wind: ${game.roundWind}\n`;
        result += `Wall: ${tileSetPrinter.printTileSet(game.wall)}\n\n`;
        for (let i = 0, l = game.players.length; i < l; i += 1) {
            let player = game.players[i];
            result += `Player[${i}]:\n`;
            result += `  Closed Hand: ${tileSetPrinter.printTileSet(player.handClosed)}`;
            if (player.drawnTile) {
                result += ` | ${tileSetPrinter.printTileSet(new TileSet([player.drawnTile]))}`;
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
    playerMatches(game, player) {
        let allowedTriplets = [
            new Tile(TILE_SUIT.HONOR, game.roundWind),
            new Tile(TILE_SUIT.HONOR, player.seatWind),
            new Tile(TILE_SUIT.HONOR, DRAGON.WHITE),
            new Tile(TILE_SUIT.HONOR, DRAGON.GREEN),
            new Tile(TILE_SUIT.HONOR, DRAGON.RED),
        ];
        for (const reference of allowedTriplets) {
            if (player.handOpen.hasTripletOf(reference)) {
                return true;
            }
            if (player.handClosed.hasTripletOf(reference)) {
                return true;
            }
        }
        return false;
    }
}
class YakuRiichi extends Yaku {
    playerMatches(game, player) {
        return player.isRiichi;
    }
}
class YakuTanYau extends Yaku {
    // Tan yao is when the hand is made from suited tiles from 2-8
    // That means no 1's, 9's or honor tiles.
    playerMatches(game, player) {
        if (player.handClosed.hasSuitOfAnyValue(TILE_SUIT.HONOR)) {
            return false;
        }
        if (player.handOpen.hasSuitOfAnyValue(TILE_SUIT.HONOR)) {
            return false;
        }
        if (player.handClosed.hasValueInAnySuit(1)) {
            return false;
        }
        if (player.handOpen.hasValueInAnySuit(1)) {
            return false;
        }
        if (player.handClosed.hasValueInAnySuit(9)) {
            return false;
        }
        if (player.handOpen.hasValueInAnySuit(9)) {
            return false;
        }
        return true;
    }
}
class YakuChanta extends Yaku {
}
var deckBuilderStandard = new DeckBuilderStandard();
var standardDeck = deckBuilderStandard.build();
standardDeck.shuffle();
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
    generateAllMelds() {
        return [
            ...this.generateSequenceMelds(),
            ...this.generateTripletMelds(),
            ...this.generatePairMelds(),
        ];
    }
    generateSequenceMelds() {
        let sequenceSuits = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        var sequenceMelds = [];
        for (const suit of sequenceSuits) {
            for (let i = 1; i < 8; i += 1) {
                sequenceMelds.push(new TileSet([
                    new Tile(suit, i),
                    new Tile(suit, i + 1),
                    new Tile(suit, i + 2),
                ]));
            }
        }
        return sequenceMelds;
    }
    generateTripletMelds() {
        let sequenceSuits = [
            TILE_SUIT.BAMBOO,
            TILE_SUIT.CHARACTER,
            TILE_SUIT.CIRCLE
        ];
        var tripletMelds = [];
        for (const suit of sequenceSuits) {
            for (let i = 1; i < 10; i += 1) {
                tripletMelds.push(new TileSet([
                    new Tile(suit, i),
                    new Tile(suit, i),
                    new Tile(suit, i),
                ]));
            }
        }
        // Honors
        for (let i = 1; i < 8; i += 1) {
            tripletMelds.push(new TileSet([
                new Tile(TILE_SUIT.HONOR, i),
                new Tile(TILE_SUIT.HONOR, i),
                new Tile(TILE_SUIT.HONOR, i),
            ]));
        }
        return tripletMelds;
    }
    generatePairMelds() {
        let tripletMelds = this.generateTripletMelds();
        for (const meld of tripletMelds) {
            meld.removeTiles(0, 0);
        }
        return tripletMelds;
    }
    computePotentialMelds(tileSet) {
        // const melds = this.generateAllMelds();
        const melds = [
            ...this.generateSequenceMelds(),
            ...this.generateTripletMelds(),
        ];
        console.info(melds.length);
        const meldScores = new Map();
        // Get all melds that are 1 or 0 away
        for (const meld of melds) {
            let missingTiles = tileSet.listMissingFrom(meld);
            let score = missingTiles.tiles.length;
            if (!meldScores.has(score)) {
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
    printScores(scores) {
        let printer = new TileSetPrinterUnicode();
        var result = '';
        for (const entry of scores) {
            let score = entry[0];
            let melds = entry[1];
            result += `Score: ${score}\n`;
            for (const meld of melds) {
                result += `  ${printer.printTileSet(meld)}\n`;
            }
        }
        return result;
    }
}
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
