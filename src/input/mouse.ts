import session from '../session';
let prevPointers: any[] = undefined;
let isPressed = false;
export default function (event: any): any {
    const { clientX, clientY, type } = event;
    const changedPointers = prevPointers;
    const Map: any = {
        mousedown: 'start',
        mousemove: 'move',
        mouseup: 'end'
    };
    session.inputStatus = Map[type];
    
    let pointers = prevPointers = [{ clientX, clientY }];
    let length = 1;
    if ('mousedown' === type) {
        isPressed = true;
    } else if ('mouseup' === type) {
        pointers = [];
        length = 0;
        isPressed = false;
        return {
            changedPointers,
            pointers,
            length
        };
    }

    if (!isPressed) return;

    return {
        changedPointers,
        pointers,
        length
    }
}; 