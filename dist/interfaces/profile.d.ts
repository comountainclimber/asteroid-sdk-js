import { ErrorResponse } from './api';
import { ProfilePrivItem } from './profiles-privilege';
export interface ProfileComponent {
    attr_id: string;
    attr_type: string;
    payload?: object;
}
export interface ProfileSection {
    label: string;
    components: ProfileComponent[];
}
export interface UserProfile {
    created_date?: number | string;
    deleted_date?: number | string;
    edited_date?: number | string;
    error?: ErrorResponse;
    profile_id?: string;
    profile_type?: string;
    remark?: string;
    sections?: ProfileSection[];
    associated_privileges?: ProfilePrivItem[];
    statistics?: ProfileStatistics;
}
export interface ModifyProfileItem {
    event: 'add' | 'delete';
    profile_id: string;
    section: string;
    attr_id: string;
}
export interface ModifyProfileComponentItem {
    type: string;
    attr_id: string;
}
export declare type ProfileType = 'personal_profile' | 'application_profile' | 'business_profile';
export interface ProfileStatistics {
    profile_view_gradient?: number;
}
