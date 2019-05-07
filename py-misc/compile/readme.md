# Compiling Python Code

If you don't want to distribute your Python source code you can
compile it to byte code and distribute that.

To compile python code use the `compileall` module:

	python -m compileall .

That creates `.pyc` (compiled) files for all of the `.py` (source)
files in directory `.`.

You can even delete the `.py` files and still run the `.pyc`:

	rm *.py
	python main.pyc




