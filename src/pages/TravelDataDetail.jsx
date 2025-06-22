import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TravelDataTable from '../features/authentications/components/TravelDataTable'; 
import { afterLoginDeleteParamApi } from "../services/ApiServices";
import { getAuthHeader } from "../utils/authUtils";

const TravelDataDetail = () => {
    const location = useLocation();
    const { travelData, updateTravelData } = location.state || {}; 
    const [travelDataState, setTravelDataState] = useState(travelData);

    const handleDelete = async (id) => {
        try {
            const authHeader = getAuthHeader();

            // Call delete API
            const response = await afterLoginDeleteParamApi(
                `/delete/travelRecord`, 
                { Authorization: authHeader }, 
                id
            );

            alert(response); 

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
            alert("Failed to delete record. Please try again.");
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
        </div>
    );
};

export default TravelDataDetail;
