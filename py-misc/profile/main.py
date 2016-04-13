
import time

class Logger():
	def error( self, info ):
		print info
logger = Logger()

functionInfos = dict()

def profile(f):
	def func(*args,**kwargs):
		timeStart = time.time()
		result = f( *args, **kwargs )
		timeEnd = time.time()
		name = f.__name__
		if name in functionInfos:
			data = functionInfos[name]
			data['durations'].append( timeEnd - timeStart )
			data['count'] += 1
		else:
			functionInfos[name] = dict(
				name = name,
				durations = [timeEnd - timeStart],
				count = 1
			)
			data = functionInfos[name]
		logger.error( '%s ran for %ss (%s calls total, %ss total)' % (
			data['name'],
			data['durations'][-1],
			data['count'],
			sum(data['durations'])
		) )
		return result
	return func

@profile
def sleep1():
	time.sleep( 1 )

@profile
def sleep3():
	time.sleep( 3 )

sleep1()
sleep1()
sleep3()
sleep1()
sleep1()
sleep1()
sleep3()
