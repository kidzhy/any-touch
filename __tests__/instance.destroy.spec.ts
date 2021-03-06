import panSimulator from './utils/Gesture/panSimulator';
import sleep from './utils/sleep';
import AnyTouch from '../src/main'
const el = document.createElement('div');

test('实例的destroy方法是否有效', async (done) => {
    const mockCallback = jest.fn();
    const at = new AnyTouch(el);
    at.on('pan', ev => {
        mockCallback();
    });
    at.destroy();
    // 模拟事件
    panSimulator(el, { direction: 'left' });
    setTimeout(()=>{
        expect(mockCallback.mock.calls.length).toBe(0);
        done();
    }, 1000)
});
