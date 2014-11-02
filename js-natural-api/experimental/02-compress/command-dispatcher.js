var Command = require( './command.js' ).Command;

function CommandDispatcher( options ){
	if( !( this instanceof CommandDispatcher ) ){
		return new CommandDispatcher();
	}

	this.commands = [];
}
CommandDispatcher.prototype.add_command = function( cmd ){
	this.commands.push( cmd );
};
CommandDispatcher.prototype.find_all_candidates = function( text ){
	var candidates = [];
	for( var i=0, l=this.commands.length; i<l; i+=1 ){
		if( this.commands[i].could_match( text ) ){
			candidates.push( this.commands[i] );
		}
	}
	return candidates;
};


var d = CommandDispatcher();
d.add_command( new Command({
	format: 'move all $x $y $z',
	action: function(x,y,z){
		return x+y+z;
	},
	description: '',
	should_guess_types: true
}) );
d.add_command( new Command({
	format: 'move $x $y $z',
	action: function(x,y,z){
		return x+y+z;
	},
	description: '',
	should_guess_types: true
}) );
d.add_command( new Command({
	format: 'move x $x',
	action: function(x){
		return x;
	},
	description: '',
	should_guess_types: true
}) );

console.info( '[ '+ d.find_all_candidates( 'move x' ).join('\n  ')+' ]' );
console.info( '[ '+ d.find_all_candidates( 'move all' ).join('\n  ')+' ]' );

module.exports.CommandDispatcher = CommandDispatcher;
