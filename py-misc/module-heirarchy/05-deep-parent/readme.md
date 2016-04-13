This does not seem possible unless you modify the system path ie:

	import os, sys
	sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
	import stuff_from_parent_point_of_view
	sys.path.pop()
