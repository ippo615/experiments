#!/usr/bin/perl

my %point;
$point{x} = 0;
$point{y} = 1;

my %_move;

sub move_by {
	$_move{data}{x} += $_[0];
	$_move{data}{y} += $_[1];
	return %_move;
}
sub move_to {
	$_move{data}{x} = $_[0];
	$_move{data}{y} = $_[1];
	return %_move;
}
sub move {
	$_move{data} = $_[0];
	return %_move;
}
$_move{by} = move_by;
$_move{to} = move_to;

move(%point);
move_by(2,2);

print "$point{x},$point{y}\n"