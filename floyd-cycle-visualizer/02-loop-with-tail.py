def update_position(old_position, delta, loop_length, tail_length):
    new_position = old_position + delta
    total_length = loop_length+tail_length
    if new_position >= total_length:
        extra = new_position - (loop_length+tail_length)
        new_position = tail_length + extra
    return new_position

def brute_force_loop_test(slow_speed: int, fast_speed: int, loop_length: int, tail_length: int):
    # Start at the first iteration
    iteration = 0
    position_slow = 0
    position_fast = 0
    max_iter = 10
    while (position_slow != position_fast or iteration < 1) and --max_iter > 0:
        position_slow = update_position(position_slow, slow_speed, loop_length, tail_length)
        position_fast = update_position(position_fast, fast_speed, loop_length, tail_length)
        iteration += 1
        
    print('  met at iteration %d (position: %d fast, %d slow)' % (iteration, position_fast, position_slow))
    print('  loop position: %d' % (position_fast-tail_length) )

def draw_loop_test(slow_speed: int, fast_speed: int, loop_length: int, tail_length: int):
    def _print_state(loop_length, tail_length, iteration, position_slow, position_fast):
        loop_state = ['  ']*(loop_length+tail_length)
        loop_state[position_slow] = 'S '
        loop_state[position_fast] = 'F'.join(loop_state[position_fast].rsplit(' ', 1))
        print(('%3d:' % iteration)+'|'.join(loop_state))

    heading = '    '+'|'.join(['--']*tail_length + ['**']*loop_length)
    print(heading)
    heading = '    '+'|'.join(['%2d' % i for i in range(loop_length+tail_length)])
    print(heading)
    # Start at the first iteration
    iteration = 0
    position_slow = 0
    position_fast = 0
    max_iter = 10
    while (position_slow != position_fast or iteration < 1) and --max_iter > 0:
    # while position_slow != position_fast or iteration < 1:
        _print_state(loop_length, tail_length, iteration, position_slow, position_fast)
        position_slow = update_position(position_slow, slow_speed, loop_length, tail_length)
        position_fast = update_position(position_fast, fast_speed, loop_length, tail_length)
        iteration += 1
    
    _print_state(loop_length, tail_length, iteration, position_slow, position_fast)
    print('  met at iteration %d (position: %d fast, %d slow)' % (iteration, position_fast, position_slow))
    print('  loop position: %d' % (position_fast-tail_length) )
    print('  computed: %d' % ((loop_length - tail_length % loop_length) % loop_length) )

if __name__ == '__main__':
    # draw_loop_test(1, 2, 2, 0)
    # for loop_length in range(2, 20):
    #     print('\n# Loop Length: %d' % loop_length)
    #     # brute_force_loop_test( 1, 2, loop_length, 0 )
    #     draw_loop_test( 1, 2, loop_length, 0 )

    for tail_length in range(0, 10):
        loop_length = 7
        print('\n# Tail Length: %d' % tail_length)
        draw_loop_test( 1, 2, loop_length, tail_length )

    # draw_loop_test( 1, 2, loop_length=3, tail_length=1)
    # draw_loop_test( 1, 2, loop_length=4, tail_length=1)
    # draw_loop_test( 1, 2, loop_length=3, tail_length=2)
    # draw_loop_test( 1, 2, loop_length=4, tail_length=2)
