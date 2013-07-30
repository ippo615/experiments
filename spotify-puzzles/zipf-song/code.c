// To compile: gcc code.c
// Or you can also use: g++ code.c
#include <stdio.h>
#include <stdlib.h>

// Data structure for each song
typedef struct {
	int index;
	char name[31];
	float frequency;
	float zipf;
	float quality;
}tSong;

// Sorting Functions - Maybe I should use a macro to generate these
int by_increasing_frequency(const void *a, const void *b){
	if( (*(tSong*)a).frequency <  (*(tSong*)b).frequency ){ return -1; }
	if( (*(tSong*)a).frequency == (*(tSong*)b).frequency ){ return  0; }
	if( (*(tSong*)a).frequency >  (*(tSong*)b).frequency ){ return  1; }
}
int by_decreasing_frequency(const void *a, const void *b){
	if( (*(tSong*)a).frequency <  (*(tSong*)b).frequency ){ return  1; }
	if( (*(tSong*)a).frequency == (*(tSong*)b).frequency ){ return  0; }
	if( (*(tSong*)a).frequency >  (*(tSong*)b).frequency ){ return -1; }
}
int by_increasing_index(const void *a, const void *b){
	if( (*(tSong*)a).index <  (*(tSong*)b).index ){ return -1; }
	if( (*(tSong*)a).index == (*(tSong*)b).index ){ return  0; }
	if( (*(tSong*)a).index >  (*(tSong*)b).index ){ return  1; }
}
int by_decreasing_quality(const void *a, const void *b){
	if( (*(tSong*)a).quality <  (*(tSong*)b).quality ){ return  1; }
	if( (*(tSong*)a).quality == (*(tSong*)b).quality ){ return  0; }
	if( (*(tSong*)a).quality >  (*(tSong*)b).quality ){ return -1; }
}

int main(){

	// Get the number of songs
	int n_songs, n_selected;
	if( fscanf(stdin,"%i %i\n",&n_songs,&n_selected) != 2 ){
		fprintf(stderr,"Hey! Your first line should be 2 numbers...\n");
		return 1;
	}

	// Allocate memory for the songs
	tSong *songs = (tSong*) malloc(sizeof(tSong)*n_songs);
	if( songs == NULL ){
		fprintf(stderr,"Failed to allocated memory for %i songs.\n", n_songs);
		return 1;
	}

	// Load the songs
	int i;
	for( i=0; i<n_songs; i+=1 ){
		songs[i].index = i+1;
		songs[i].zipf = 0.0f;
		songs[i].quality = 0.0f;
		if( fscanf(stdin,"%f ",&songs[i].frequency) == 0 ){
			fprintf(stderr,"Couldn't find a number at song #%i",i);
			free(songs);
			return 1;
		}
		if( fscanf(stdin,"%s\n",songs[i].name) == 0 ){
			fprintf(stderr,"Had trouble with the song name at song #%i",i);
			free(songs);
			return 1;
		}
	}

	// Sort by frequency
	// qsort(songs,n_songs,sizeof(tSong),by_decreasing_frequency);

	// Debug what has been loaded
	// for( i=0; i<n_songs; i+=1 ){
	// 	fprintf(stdout,"%s: %f\n",songs[i].name,songs[i].frequency);
	// }

	// Compute the zipf score and quality
	float base_z = songs[0].frequency;
	for( i=0; i<n_songs; i+=1 ){
		songs[i].zipf = base_z / (float)(i+1);
		songs[i].quality = songs[i].frequency / songs[i].zipf;
	}

	// Sort by index
	qsort(songs,n_songs,sizeof(tSong),by_increasing_index);
	qsort(songs,n_songs,sizeof(tSong),by_decreasing_quality);

	// Print the top (however many we want)
	for( i=0; i<n_selected; i+=1 ){
		printf("%s\n", songs[i].name);
	}

	// fprintf(stdout,"%i -- %i\n",n_songs,n_selected);

	free(songs);
	return 0;
}
