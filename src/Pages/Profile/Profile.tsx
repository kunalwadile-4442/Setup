import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ReusableTable } from "../../components/Layout/TableLayout";
import ConfirmModalPopup from "../../components/modal/ConformationPopup";
import { hideConfirmPopup, showConfirmPopup } from "../../Redux/ui/uiSlice";

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "status", label: "Status", align: "center" },
];

const dummyData = [
  { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
];


const Profile = () => {

  const confirmPopupOpen =  useAppSelector((state)=>state.ui.isConfirmPopupOpen);
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(showConfirmPopup());
    
  };
  const handleConfirmDelete = () => {
    // You can perform delete logic here, using state if needed
    dispatch(showConfirmPopup());
    console.log("Delete confirmed");
    dispatch(hideConfirmPopup());
  }

  return (
    <>
  
    <ReusableTable
      columns={columns}
      data={dummyData}
      onEdit={(item) => console.log("Edit:", item)}
      onView={(item) => console.log("View:", item)}
      onDelete={onDelete}
      tableClassName="w-full"
    />

    <ConfirmModalPopup
        show={confirmPopupOpen}
        title="Are you sure?"
        description="Do you really want to delete this task? This action cannot be undone."
        buttonSuccess="Delete"
        buttonCancel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => dispatch(hideConfirmPopup())}
      />

        </>
  );
};

export default Profile;