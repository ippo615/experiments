'''
Define a variable my_sent to be a list of words, using the syntax my_sent = ["My", "sent"] (but with your own words, or a favorite saying).
        Use ' '.join(my_sent) to convert this into a string.
        Use split() to split the string back into the list form you had to start with.
'''

my_sent = ['my','sent']
print my_sent

print '%s' % ' '.join(my_sent)
print '%s' % (' '.join(my_sent)).split()
