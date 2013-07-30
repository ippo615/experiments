#!/usr/bin/env python
import sys

# This is a class that is effectively a dictionary but I can
# access the elements with a '.' ie point.x instead of point['x']
class DICDOT(dict):
    def __getattr__(self, attr):
        return self.get(attr, None)
    __setattr__= dict.__setitem__
    __delattr__= dict.__delitem__

# The first line is (the number of songs) (the number to select)
numbers = sys.stdin.readline().split()
n_songs = int(numbers[0])
n_selected = int(numbers[1])

# print 'Songs: '+str(n_songs)
# print 'Selected: '+str(n_select)

# Array to hold all of the songs
songs = []

# The rest of the lines are the songs
index = 0
for line in sys.stdin:

	index += 1

	# Create a simple data structure to hold information about the songs
	data = line.split()
	song = DICDOT()
	song.frequency = float(data[0])
	song.zipf_score = 0
	song.name = data[1]
	song.index = index
	song.quality = 0

	# Add this song to the entire list of songs
	songs.append(song)

# Sort the songs by the number of times they were listened to (most first)
songs.sort( key=lambda song: song.frequency, reverse=True )

last_score = songs[0].frequency
index = 1
base_z = songs[0].frequency
for i in range(0,len(songs)):
	song = songs[i]
	
	# I think ties should be treated the same
	if song.frequency != last_score:
		index = i+1
		last_score = song.frequency

	# Commet this to treat a tie between multiple things as the same
	index = i+1

	# Be sure to use floats otherwise the results of integer division
	# may round down to 0 - causing a fatal divide by 0 error

	song.zipf_score = base_z / index
	song.quality = song.frequency / song.zipf_score

# Sort the songs by quality (highest first) and original order (first first)
songs.sort( key=lambda song: song.index )
songs.sort( key=lambda song: song.quality, reverse=True )

for i in range(0,n_selected):
	print songs[i].name

#for song in songs:
#	print '{quality} {zipf_score} {frequency} {name}'.format(**song)
