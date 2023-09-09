import { AxiosResponse } from 'axios';
import {
    shared_IRequestData,
    shared_IResponseData,
    shared_IError,
    shared_IAdventure,
    shared_ICharacter,
    shared_INote,
    shared_ISecondaryStatVal,
    shared_Optional,
    shared_ISecStatScaling,
    shared_IsecondaryStat
} from '../../../shared/magus_app_types'

export type TRequest = (inputData: IRequestData, callback?: Function | void) => Promise<void | AxiosResponse>;
export interface IRequestData extends shared_IRequestData{};
export interface IResponseData extends shared_IResponseData{};
export interface IError extends shared_IError{};
export interface IAdventure extends shared_IAdventure{};
export interface IChar extends shared_ICharacter{};
export interface INote extends shared_INote{};
export interface ISecondaryStatVal extends shared_ISecondaryStatVal{};
export interface ISecStatScaling extends shared_ISecStatScaling{};
export interface IsecondaryStat extends shared_IsecondaryStat{};

export type Optional<T, K extends keyof T> = shared_Optional<T, K>;

export interface IRegexErrorArray {
    value: boolean;
    msg: string;
  }