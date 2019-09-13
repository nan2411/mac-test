import { toast} from 'react-toastify';

export default function (message, type = 'success') {
    let position = toast.POSITION.BOTTOM_RIGHT;

    switch (type){
        case 'success':
            toast.success(message, {position});
            break;
        case 'warning':
            toast.warn(message, {position});
            break;
        case 'error':
            toast.error(message, {position});
            break;
        default:
            toast.info(message, {position});
            break;
    }

}