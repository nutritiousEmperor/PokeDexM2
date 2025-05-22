export class Pokémon
{
    static baseImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
    static abilities = {}; // is an object

    constructor(pokemonName, pokemonID)
    {
        this._pokemonName = pokemonName;
        this._pokemonID = pokemonID;
        this._imgUrl = `${Pokémon.baseImgUrl}/${pokemonID}.png`;
    }

    // Getters:
    static getPokemonName() { return this._pokemonName; }
    static getPokemonID() { return this._pokemonID; }
    static getPokemonWeight() { return this._pokemonWeight; }
    static getPokemonHeight() { return this._pokemonHeight; }
    static getPokemonHp() { return this._pokemonHp; }
    static getPokemonAttack() { return this._pokemonAttack; }
    static getPokemonDefense() { return this._pokemonDefense; }
    static getPokemonSpecialAttack() { return this._pokemonSpecialAttack; }
    static getPokemonSpecialDefense() { return this._pokemonSpecialDefense; }
    static getPokemonSpeed() { return this._pokemonSpeed; }
    static getPokemonType() { return this._pokemonType; }


    // Setters:
    static setPokemonName(pokemonName) { this._pokemonName = pokemonName; }
    static setPokemonID(pokemonID) { this._pokemonID = pokemonID; }
    static setPokemonWeight(pokemonWeight) {this._pokemonWeight = pokemonWeight; }
    static setPokemonHeight(pokemonHeight) {this._pokemonHeight = pokemonHeight; }
    static setPokemonHp(pokemonHp) {this._pokemonHp = pokemonHp; }
    static setPokemonAttack(pokemonAttack) {this._pokemonAttack = pokemonAttack; }
    static setPokemonDefense(pokemonDefense) {this._pokemonDefense = pokemonDefense; }
    static setPokemonSpecialAttack(pokemonSpecialAttack) {this._pokemonSpecialAttack = pokemonSpecialAttack; }
    static setPokemonSpecialDefense(pokemonSpecialDefense) {this._pokemonSpecialDefense = pokemonSpecialDefense; }
    static setPokemonSpeed(pokemonSpeed) {this._pokemonSpeed = pokemonSpeed; }
    static setPokemonType(pokemonType) {this._pokemonType = pokemonType; }
}

