import { IFormDivision, IFormMemberDivision, IFormFixDivision, IDataDivison, IDataMemberDivision } from './lib/type_division';
import CreateUserDivisionCalender from "./_division_fitur/calender/components/create_user_division_calender";
import UlangiEvent from "./_division_fitur/calender/components/ulangi_event";
import UpdateUlangiEvent from "./_division_fitur/calender/components/update_calander/update_ulangi_event";
import UpdateUserDivisionCalender from "./_division_fitur/calender/components/update_calander/update_user_division_calender";
import ViewCreateDivisionCalender from "./_division_fitur/calender/view/view_create_division_calender";
import ViewDetailEventDivision from "./_division_fitur/calender/view/view_detail_event_division";
import ViewDivisionCalender from "./_division_fitur/calender/view/view_division_calender";
import ViewHistoryDivisionCalender from "./_division_fitur/calender/view/view_history_division_calender";
import ViewUpdateDivisionCalender from "./_division_fitur/calender/view/view_update_division_calender";
import { apiDiscussion } from "./_division_fitur/discussion/api/api_discussion";
import ViewCreateDiscussion from "./_division_fitur/discussion/view/view_create_discussion";
import ViewDetailDiscussion from "./_division_fitur/discussion/view/view_detail_discussion";
import ViewEditDiscussion from "./_division_fitur/discussion/view/view_edit_discussion";
import ViewListDiscussion from "./_division_fitur/discussion/view/view_list_discussion";
import ViewDocumentDivision from "./_division_fitur/document/view/view_document_division";
import ViewCreateTaskDivision from "./_division_fitur/task/view/view_create_division_task";
import ViewDetailDivisionTask from "./_division_fitur/task/view/view_detail_division_task";
import ViewDivisionTask from "./_division_fitur/task/view/view_division_task";
import ViewUpdateProgressDivisionTask from "./_division_fitur/task/view/view_update_progress_division_task";
import { apiDivision } from "./api/api_division";
import CreateAdminDivision from "./ui/create_admin_division";
import CreateUsers from "./ui/create_users";
import ListDivision from './ui/list_division';
import CreateDivision from './ui/create_division';
import NavbarDetailDivision from './ui/navbar_detail_division';
import CarouselDivision from './ui/carousel_division';
import FeatureDetailDivision from './ui/feature_detail_division';
import ListTaskOnDetailDivision from './ui/list_task';
import ListDocumentOnDetailDivision from './ui/list_document';
import ListDiscussionOnDetailDivision from './ui/list_discussion';
import InformationDivision from './ui/information_division';
import CreateAnggotaDivision from './ui/create_anggota_division';
import EditDivision from './ui/edit_division';
import CreateReport from './ui/create_report';
import ReportDivisionId from './ui/report_division_id';

export { CreateUsers };
export { CreateAdminDivision };
export { ViewDivisionTask };
export { ViewDetailDivisionTask };
export { ViewUpdateProgressDivisionTask };
export { ViewDivisionCalender };
export { ViewCreateDivisionCalender };
export { ViewCreateTaskDivision };
export { UlangiEvent };
export { CreateUserDivisionCalender };
export { ViewHistoryDivisionCalender };
export { ViewDetailEventDivision };
export { ViewUpdateDivisionCalender };
export { UpdateUserDivisionCalender };
export { UpdateUlangiEvent };
export { ViewListDiscussion };
export { ViewCreateDiscussion };
export { ViewDetailDiscussion };
export { ViewEditDiscussion };
export { ViewDocumentDivision };
export { apiDivision }
export { apiDiscussion }
export type { IFormDivision, IFormMemberDivision, IFormFixDivision, IDataDivison, IDataMemberDivision }
export { ListDivision }
export { CreateDivision }
export { NavbarDetailDivision }
export { CarouselDivision }
export { FeatureDetailDivision }
export { ListTaskOnDetailDivision }
export { ListDocumentOnDetailDivision }
export { ListDiscussionOnDetailDivision }
export { InformationDivision }
export { CreateAnggotaDivision }
export { EditDivision }
export { CreateReport }
export { ReportDivisionId }
