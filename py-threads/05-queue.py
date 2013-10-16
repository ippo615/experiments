#!/usr/bin/python

import threading, Queue

# Create a queue of work
myQueue = Queue.Queue()
for item in ['1','2','3','4','5','6','7','8','9']:
	myQueue.put(item)

# A function to handle 1 task
def doWork():
	# As long as their is work to be done
	while 1:
		# Do the next task
		print myQueue.get()
		# Report that this task is finished
		myQueue.task_done()

# Create 4 threads to run our jobs
for i in range(4):
	aThread = threading.Thread(target=doWork)
	# daemon lets the program end once the tasks are done
	aThread.daemon = True
	aThread.start()

print 'Starting'
# Wait until all tasks are done
myQueue.join()
print 'Done'

# I have found the output varies from run to run
# The treads will sometimes finish before 'Starting' is printed
