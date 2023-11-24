import time

import pyautogui

if __name__ == '__main__':
    # https://pyautogui.readthedocs.io/en/latest/quickstart.html
    # x, y = pyautogui.position()
    # pyautogui.moveTo(0, 0, duration=1)
    # time.sleep(1.0)
    # pyautogui.typewrite('Hello world!\n', interval=0)
    # pyautogui.hotkey('ctrl', 'c')
    # pyautogui.hotkey('shift', 'enter')
    print(pyautogui.confirm('Hello?'))
    print('Hello world!')
