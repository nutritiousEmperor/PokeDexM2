export class Pokémon
{
    //static baseImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon`;
    static baseImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/`;
    static abilities = {}; // is an object

    constructor(pokemonName, pokemonID)
    {
        this._pokemonName = pokemonName;
        this._pokemonID = pokemonID;
        this._imgUrl = `${Pokémon.baseImgUrl}/${pokemonID}.svg`;
    }

    // Getters:
    getPokemonName() { return this._pokemonName; }
    getPokemonID() { return this._pokemonID; }
    getPokemonWeight() { return this._pokemonWeight; }
    getPokemonHeight() { return this._pokemonHeight; }
    getPokemonHp() { return this._pokemonHp; }
    getPokemonAttack() { return this._pokemonAttack; }
    getPokemonDefense() { return this._pokemonDefense; }
    getPokemonSpecialAttack() { return this._pokemonSpecialAttack; }
    getPokemonSpecialDefense() { return this._pokemonSpecialDefense; }
    getPokemonSpeed() { return this._pokemonSpeed; }
    getPokemonType() { return this._pokemonType; }
    getPokemonExperience() { return this._pokemonExperience; }

    // Setters:
    setPokemonName(pokemonName) { this._pokemonName = pokemonName; }
    setPokemonID(pokemonID) { this._pokemonID = pokemonID; }
    setPokemonWeight(pokemonWeight) {this._pokemonWeight = pokemonWeight; }
    setPokemonHeight(pokemonHeight) {this._pokemonHeight = pokemonHeight; }
    setPokemonHp(pokemonHp) {this._pokemonHp = pokemonHp; }
    setPokemonAttack(pokemonAttack) {this._pokemonAttack = pokemonAttack; }
    setPokemonDefense(pokemonDefense) {this._pokemonDefense = pokemonDefense; }
    setPokemonSpecialAttack(pokemonSpecialAttack) {this._pokemonSpecialAttack = pokemonSpecialAttack; }
    setPokemonSpecialDefense(pokemonSpecialDefense) {this._pokemonSpecialDefense = pokemonSpecialDefense; }
    setPokemonSpeed(pokemonSpeed) {this._pokemonSpeed = pokemonSpeed; }
    setPokemonType(pokemonType) {this._pokemonType = pokemonType; }
    setPokemonExperience(pokemonExperience) {this._pokemonExperience = pokemonExperience; }
}

