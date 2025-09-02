export interface EmailGroupEdit {
    numbers: number[];
    owner: string;
    label: string;
    duedate: string;
    isOwnerClear: boolean;
    isLabelClear: boolean;
    isDueDateClear: boolean;
    currentUser: string;
}
