# Python retry

Have you ever had so many nested try/except/finally blocks that you had
to scroll to see real text? Like:

	try:
		attempt1()
	except FailedAttemptError:
		try:
			attempt2()
		except FailedAttemptError:
			try:
				attempt3()
			except FailedAttemptError:
				pass
				# ...

The 3 examples show how to un-nest structures like that for code that
is much more readable:

	try_each( [
			action1,
			action2,
			action3
		],
		FailedAttemptError
	)
