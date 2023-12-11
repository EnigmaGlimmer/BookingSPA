import StaffForm from 'components/form/staff';
import StaffTable from 'components/table/staff-table';
import useUserManagement from 'hooks/useUserManagement';
import React from 'react';

export const AdminStaffContext = React.createContext();

function AdminStaff() {
    const { staffs, addNewUser } = useUserManagement();

    return (
        <>
            <h2 className="mb-3">Form of staff registration</h2>

            <StaffForm
                onAfterSubmitting={(userId) => {
                    addNewUser(userId);
                }}
            ></StaffForm>

            <h2 className="mb-3">List of staff</h2>

            <StaffTable data={staffs}></StaffTable>
        </>
    );
}

export const useAdminStaffContext = function () {
    return React.useContext(AdminStaffContext);
};

export default AdminStaff;
