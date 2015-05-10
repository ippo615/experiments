
# Python/Arduino Basic Echo

## Setup the Arduino

1. Load `echo.ino` in the Arduino IDE and upload the code to your board.
2. Note the name of the serial port on the lower right side of the IDE,
   mine was `/dev/ttyACM0`
3. Exit the Arduino IDE

## Run the Python Code

1. Edit `echo.py` so it used the serial port name you found in the
   previous step.
2. Run `python echo.py` 

You should now see a list of characters being echoed in your python
terminal.
