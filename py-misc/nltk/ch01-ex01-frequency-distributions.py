import nltk
from nltk.book import text1

# Create a frequency distribution
freqDist = nltk.FreqDist(text1)
print '\n'
print 'The 50 most common words are:\n%s\n' % freqDist.most_common(50)
print 'The most common word is: %s' % freqDist.max()
print 'The word "whale" appears %s times' % freqDist['whale']
print 'The word "mispeled" appears %s times' % freqDist['mispeled']

'''
fdist = FreqDist(samples) 	create a frequency distribution containing the given samples
fdist[sample] += 1 	increment the count for this sample
fdist['monstrous'] 	count of the number of times a given sample occurred
fdist.freq('monstrous') 	frequency of a given sample
fdist.N() 	total number of samples
fdist.most_common(n) 	the n most common samples and their frequencies
for sample in fdist: 	iterate over the samples
fdist.max() 	sample with the greatest count
fdist.tabulate() 	tabulate the frequency distribution
fdist.plot() 	graphical plot of the frequency distribution
fdist.plot(cumulative=True) 	cumulative plot of the frequency distribution
fdist1 |= fdist2 	update fdist1 with counts from fdist2
fdist1 < fdist2 	test if samples in fdist1 occur less frequently than in fdist2
'''
