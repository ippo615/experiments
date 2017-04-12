from ctypes import cdll
lib = cdll.LoadLibrary('./main.so')

if __name__ == '__main__':
	lib.say_hi()
