With this folder structure. `a` and `b` can access anything in
`__init__`. When importing the module `a` and `b` are not accessible.
Instread of being used directly then can be imported:

	from my_module import a    # GOOD

	import my_module    # BAD
	my_module.a         # BAD

