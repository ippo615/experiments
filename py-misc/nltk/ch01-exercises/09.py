'''
Review 2 on lists and strings.
  Define a string and assign it to a variable, e.g.
  `my_string = 'My String'` (but put something more interesting in
  the string). Print the contents of this variable in two ways, first
  by simply typing the variable name and pressing enter, then by using
  the print statement.
  
  Try adding the string to itself using my_string + my_string, or
  multiplying it by a number, e.g., my_string * 3. Notice that the
  strings are joined together without any spaces. How could you fix
  this?
'''

my_string = 'Hello world'
print my_string

print '%s' % (my_string+my_string)
print '%s' % (my_string*3)

print '%s' % (my_string+' '+my_string)
print '%s' % (my_string+' ')*3
