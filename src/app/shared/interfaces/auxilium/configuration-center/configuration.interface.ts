export interface ConfigurationDisplay {
    id?: number;
    group: string;
    setting: string;
    value: string;
    notes: string;
    adduserid: string;
    adddate: string;
}

export type GetConfigurationResponse = ConfigurationDisplay[];
