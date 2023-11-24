def brute_force_loop_test(slow_speed: int, fast_speed: int, loop_length: int):
    # Start at the first iteration
    iteration = 1
    position_slow = slow_speed
    position_fast = fast_speed
    while position_slow != position_fast:
        iteration += 1
        position_slow = (position_slow + slow_speed) % loop_length
        position_fast = (position_fast + fast_speed) % loop_length
        
    print('  met at iteration %d (position: %d, %d)' % (iteration, position_fast, position_slow))

def draw_loop_test(slow_speed: int, fast_speed: int, loop_length: int):
    def _print_state(loop_length, iteration, position_slow, position_fast):
        loop_state = ['  ']*loop_length
        loop_state[position_slow] = 'S '
        loop_state[position_fast] = 'F'.join(loop_state[position_fast].rsplit(' ', 1))
        print(('%3d:' % iteration)+'|'.join(loop_state))

    heading = '    '+'|'.join(['%2d' % i for i in range(loop_length)])
    print(heading)
    # Start at the first iteration
    iteration = 0
    position_slow = 0
    position_fast = 0
    while position_slow != position_fast or iteration < 1:
        _print_state(loop_length, iteration, position_slow, position_fast)
        position_slow = (position_slow + slow_speed) % loop_length
        position_fast = (position_fast + fast_speed) % loop_length
        iteration += 1
    
    _print_state(loop_length, iteration, position_slow, position_fast)
    # print('  met at iteration %d (position: %d, %d)' % (iteration, position_fast, position_slow))

if __name__ == '__main__':
    for i in range(1, 20):
        print('\n# Loop Length: %d' % i)
        draw_loop_test(1,2,i)
