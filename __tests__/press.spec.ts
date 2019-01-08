import TouchSimulator from './utils/TouchSimulator';
import sleep from './utils/sleep';
import AnyTouch from '../src/main'
document.body.innerHTML = '<div id="box">box</div>';
const el = document.getElementById('box');
const at = new AnyTouch(el);
const MIN_PRESS_TIME = 251;

test('press|pressup事件是否正确?', async(done) => {
    let lastTime: number;
    at.on('press', ({ type, timestamp }) => {
        lastTime = timestamp;
        expect(type).toBe('press');
    });

    at.on('pressup', ({ type, timestamp }) => {
        expect(timestamp - lastTime).toBeGreaterThanOrEqual(MIN_PRESS_TIME);
        expect(type).toBe('pressup');
        done();
    });

    // 模拟touch触碰
    const ts = new TouchSimulator(el);
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    ts.dispatchTouchMove([{ x: 3, y: 3 }]);
    await sleep(MIN_PRESS_TIME);
    ts.dispatchTouchEnd();
    
});


test('移动距离过大press事件失败,流程是否正确?', async (done) => {
    const mockCallback = jest.fn();
    at.off('press');
    at.off('pressup');

    at.on('press', ({ type }) => {
        mockCallback();
    });

    at.on('pressup', ({ type }) => {
        mockCallback();
    });
    
    // 模拟touch触碰
    const ts = new TouchSimulator(el);
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    ts.dispatchTouchMove([{ x: 30, y: 30 }]);
    await sleep(MIN_PRESS_TIME - 100);
    ts.dispatchTouchEnd();
    // 等待MIN_PRESS_TIME秒后, 看看是否触发了事件
    await sleep(100);
    expect(mockCallback.mock.calls.length).toBe(0);
    done();
});