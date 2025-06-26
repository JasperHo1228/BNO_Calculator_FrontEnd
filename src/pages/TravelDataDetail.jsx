import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TravelDataTable from '../features/authentications/components/TravelDataTable'; 
import { afterLoginDeleteParamApi } from "../services/ApiServices";
import '../style/CommonStyle/AlertBox.css'

const TravelDataDetail = () => {
    const location = useLocation();
    const { travelData, updateTravelData } = location.state || {}; 
    const [travelDataState, setTravelDataState] = useState(travelData);
    const [customAlert, setCustomAlert] = useState({ visible: false, message: "", type: "info" });

    const showAlert = (message, type = "info") => {
        return new Promise((resolve) => {
        setCustomAlert({
            visible: true,
            message,
            type,
            onConfirm: () => {
            setCustomAlert({ ...customAlert, visible: false });
            resolve(); 
            }
        });
        });
    };
    const handleDelete = async (id) => {
        try {
            // Call delete API
            const response = await afterLoginDeleteParamApi(
                `/delete/travelRecord`, id
            );

            showAlert(response,"success"); 
            // Remove deleted item and update totals
            const updatedList = travelDataState.user_each_travel_day_count_data_list.user_date_count_list
                .filter(item => item.id !== id);

            const newTotalDays = updatedList.reduce(
                (total, travelDay) => total + travelDay.total_day_each_travel, 
                0
            );

            const updatedData = {
                ...travelDataState,
                user_each_travel_day_count_data_list: {
                    ...travelDataState.user_each_travel_day_count_data_list,
                    user_date_count_list: updatedList,
                },
                total_day_each_year: newTotalDays,
            };

            // Update local and parent state
            setTravelDataState(updatedData);
            if (updateTravelData) {
                updateTravelData(updatedData);
            }

        } catch (error) {
            console.error("Error deleting travel record:", error);
            showAlert("Failed to delete record. Please try again.", "error");
        }
    };

    return (
        <div>
            {travelDataState ? (
                <TravelDataTable 
                    travelData={travelDataState} 
                    onDelete={handleDelete} 
                />
            ) : (
                <p className='text-error'>No travel data available.</p>
            )}
           {customAlert.visible && (
                <div className="custom-alert-overlay">
                    <div className={`custom-alert-box ${customAlert.type}`}>
                        <p className="alert-message">{customAlert.message}</p>
                        <button onClick={customAlert.onConfirm}>OK</button>
                    </div>
                </div>
          )}
        </div>
    );
};

export default TravelDataDetail;
