import { AxiosResponse } from 'axios';
import {
    shared_IRequestData,
    shared_IResponseData,
    shared_IError
} from '../../../shared/magus_app_types'

export type TRequest = (inputData: IRequestData, callback?: Function | void) => Promise<void | AxiosResponse>;
export interface IRequestData extends shared_IRequestData{};
export interface IResponseData extends shared_IResponseData{};
export interface IError extends shared_IError{};