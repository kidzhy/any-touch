import { Input } from './interface';
import createInput from './input/create';
// 起点(单点|多点)
let startInput: Input | undefined;
// 前一次的触电
let prevInput: Input | undefined;
// 当前触点
let activeInput: Input | undefined;
// 多点触碰的起点
let startMutliInput: Input | undefined;
export default (event: Event): any => {
    // 格式化不同设备输入数据
    const input = createInput(event);

    // 无效的输入    
    if (undefined === input) return;

    // 当前输入状态
    const { eventType } = input;
    // [Start]
    if ('start' === eventType) {
        // 上一步的触点
        // prevInput = undefined;
        // 当前点
        activeInput = input;
        // 起点(单点|多点)
        startInput = input;
        // 起点(多点)
        if (1 < input.pointLength) {
            startMutliInput = input;
        } else {
            // 如果出现了单点, 那么之前的多点起点记录失效
            startMutliInput = undefined;
        }
    } else if ('move' === eventType) {
        // 读取上一点
        prevInput = activeInput;
        activeInput = input;
    } else if ('end' === eventType) {
        prevInput = activeInput;
        activeInput = input;
    }
    return {
        startMutliInput,
        startInput,
        prevInput,
        input
    };
}; 