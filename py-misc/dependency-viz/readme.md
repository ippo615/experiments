# Pythhon Dependency Visualizer

This produces a csv file that can be used with D3.js to viualize the
interconnectedness of your python modules/programs. It uses a force
directed layout which is not the best for this kind of visualization.
A heirarchical tree would be better (that may be made in the future).

Edit and run `dependency-vis.py` it will print csv data which you can
put into `data.csv`. Then launch `index.html` in your webbrowser.

You can also look for circular imports using the circular imports
script.
