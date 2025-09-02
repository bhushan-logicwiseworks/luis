import Swal, { SweetAlertOptions } from 'sweetalert2';
import { ToastMessages } from '../../common/constants/constVariables';

export const ToastConfig = {
    ADD_SUCCESS: (config: SweetAlertOptions = {}): void => {
        return ToastConfig.SUCCESS({
            title: ToastMessages.CREATE.SUCCESS,
            ...config,
        });
    },

    ADD_FAILURE: (config: SweetAlertOptions = {}): void => {
        return ToastConfig.ERROR({
            title: ToastMessages.CREATE.ERROR,
            ...config,
        });
    },

    EDIT_SUCCESS: (config: SweetAlertOptions = {}): void => {
        return ToastConfig.SUCCESS({
            title: ToastMessages.EDIT.SUCCESS,
            ...config,
        });
    },

    EDIT_FAILURE: (config: SweetAlertOptions = {}): void => {
        return ToastConfig.ERROR({
            title: ToastMessages.EDIT.ERROR,
            ...config,
        });
    },

    DELETE_SUCCESS: (config: SweetAlertOptions = {}): void => {
        return ToastConfig.SUCCESS({
            title: ToastMessages.DELETE.SUCCESS,
            ...config,
        });
    },

    DELETE_FAILURE: (config: SweetAlertOptions = {}): void => {
        return ToastConfig.ERROR({
            title: ToastMessages.DELETE.ERROR,
            ...config,
        });
    },

    // New generic methods for custom messages
    CUSTOM_SUCCESS: (messageKey: keyof typeof ToastMessages.CUSTOM, config: SweetAlertOptions = {}): void => {
        return ToastConfig.SUCCESS({
            title: ToastMessages.CUSTOM[messageKey],
            ...config,
        });
    },

    CUSTOM_FAILURE: (messageKey: keyof typeof ToastMessages.CUSTOM, config: SweetAlertOptions = {}): void => {
        if (messageKey === 'patientNotFound') {
            return ToastConfig.ERROR({
                position: 'center',
                title: 'Oops...',
                text: ToastMessages.CUSTOM[messageKey],
                showConfirmButton: true,
                ...config,
            });
        }
        return ToastConfig.ERROR({
            title: ToastMessages.CUSTOM[messageKey],
            ...config,
        });
    },

    SUCCESS: (config: SweetAlertOptions): void => {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: ToastMessages.CREATE.SUCCESS,
            showConfirmButton: false,
            timer: 1500,
            ...config,
        });
    },

    ERROR: (config: SweetAlertOptions): void => {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: ToastMessages.CREATE.ERROR,
            showConfirmButton: false,
            timer: 1500,
            ...config,
        });
    },
};
