export interface CommonDropDown {
    id: number;
    code: string;
    description: string;
    name?: string;
}

export type GetCommonDropDownResponse = CommonDropDown[];
