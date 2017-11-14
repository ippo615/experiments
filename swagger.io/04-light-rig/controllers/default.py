import light
import rpi_input

def get():
	return {
		'lights': light.listAll(),
		'inputs': rpi_input.listAll()
	}
