import { AxiosResponse } from 'axios';
import {
    Application,
    Character,
    Adventure,
    User
} from '../../../shared/magus_app_types'

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface IRegexErrorArray {
    value: boolean;
    msg: string;
}

export {
    Application,
    Character,
    Adventure,
    User
}